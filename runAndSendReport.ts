import { exec } from "child_process";
import nodemailer from "nodemailer";
import * as fs from "fs";
import dotenv from "dotenv";
dotenv.config();

// -----------------------------
// Interface for Playwright JSON
// -----------------------------
interface PlaywrightReport {
  stats: {
    expected: number;
    unexpected: number;
    skipped: number;
    flaky: number;
    duration: number;
  };
}

// -----------------------------
// Get Test Summary Dynamically
// -----------------------------
function getTestSummary() {
  const rawData = fs.readFileSync("test-results.json", "utf-8");
  const report: PlaywrightReport = JSON.parse(rawData);

  const total =
    report.stats.expected +
    report.stats.unexpected +
    report.stats.skipped +
    report.stats.flaky;

  const passed = report.stats.expected;
  const failed = report.stats.unexpected;

  const durationMs = report.stats.duration;
  const seconds = Math.floor((durationMs / 1000) % 60);
  const minutes = Math.floor((durationMs / (1000 * 60)) % 60);
  const hours = Math.floor(durationMs / (1000 * 60 * 60));

  const formattedDuration = `${hours}h ${minutes}m ${seconds}s`;

  return {
    total,
    passed,
    failed,
    duration: formattedDuration,
    status: failed > 0 ? "FAIL" : "PASS",
  };
}

// -----------------------------
// Send Email Function
// -----------------------------
async function sendEmail() {
  const summary = getTestSummary();

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    }
  });

  const htmlTemplate = `
  <div style="font-family: Arial, sans-serif; padding:20px;">
    <h2>Automation Test Execution Summary</h2>
    <p>Hi Team,</p>
    <p>Below is the execution summary:</p>

    <table border="1" cellpadding="10" cellspacing="0" 
           style="border-collapse: collapse; text-align:center;">
      <tr style="background-color:#f2f2f2;">
        <th>Total Tests</th>
        <th>Passed</th>
        <th>Failed</th>
        <th>Duration</th>
      </tr>
      <tr>
        <td>${summary.total}</td>
        <td style="color:green; font-weight:bold;">
          ${summary.passed}
        </td>
        <td style="color:red; font-weight:bold;">
          ${summary.failed}
        </td>
        <td>${summary.duration}</td>
      </tr>
    </table>

    <br/>

    <p>
      Execution Status: 
      <b style="color:${summary.status === "PASS" ? "green" : "red"};">
        ${summary.status}
      </b>
    </p>

    <br/>
    <p>Regards,<br/>Automation Framework</p>
  </div>
  `;

  await transporter.sendMail({
    from: `"Automation Framework" campntest25@gmail.com`,
    to: "rmcrun1@gmail.com",
    subject: `Automation Report - ${summary.status}`,
    html: htmlTemplate,
  });

  console.log("  Email sent successfully");
}

// -----------------------------
// Main Execution Flow
// -----------------------------
console.log("  Running Playwright tests...");

exec("npx playwright test", (error) => {
  console.log("Generating Allure report...");
  exec("npx allure generate allure-results --clean -o allure-report", async () => {
    await sendEmail();
  });
});

