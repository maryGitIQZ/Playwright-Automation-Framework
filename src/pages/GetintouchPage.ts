import { Page, Locator, expect } from '@playwright/test';


export class GetintouchPage {
  readonly page: Page;

  readonly nameInput: Locator;
  readonly emailInput: Locator;
  readonly companyInput: Locator;
  readonly helpTextArea: Locator;
  readonly submitButton: Locator;
  readonly successMessage : Locator;
  readonly nameError :Locator;
  readonly emailError :Locator;
  readonly companyError :Locator;
  readonly clearButton : Locator;
  readonly closeButton : Locator;

  constructor(page: Page) {
    this.page = page;

    this.nameInput = page.getByRole('textbox', { name: 'Name *' })
    this.emailInput = page.getByRole('textbox', { name: 'Work Email *' });
    this.companyInput = page.getByRole('textbox', { name: 'Company *' });
    this.helpTextArea = page.getByRole('textbox', { name: 'How can we help?' });
    this.submitButton = page.getByRole('button', { name: 'Submit' });
    this.successMessage =page.getByText("Thank you for reaching out to us. We'll get back to you shortly.");
    this.clearButton =page.getByRole('button', { name: 'Clear' });
    this.closeButton=page.getByRole('button', { name: 'close' });
   
    this.nameError=page.getByText("The name field can't be empty");
    this.emailError =page.getByText("This email is invalid");
    this.companyError =page.getByText("The company field can't be empty");
    
  }

  async clickSubmit() {
    await this.submitButton.click();
  }

  async verifyMandatoryErrors() {
    await expect(this.nameError).toBeVisible();
    await  expect(this.nameError).toHaveText ("The name field can't be empty");
    await expect(this.emailError).toBeVisible();
    await  expect(this.emailError).toHaveText ("This email is invalid");
     await expect(this.companyError).toBeVisible();
    await  expect(this.companyError).toHaveText ("The company field can't be empty");    
  }

  async enterValidDetails()
  {
    await this.nameInput.fill('MD Test One');
    await this.emailInput.fill('mdtest.two@gmail.com');
    await this.companyInput.fill('Test Automation');
    await this.helpTextArea.fill('This is an automation test submission');
   
  }
  async verifySuccessMessage()
  {
    await expect(this.successMessage).toBeVisible({timeout:6000});
    await expect(this.successMessage).toHaveText ("Thank you for reaching out to us. We'll get back to you shortly.");
  }

  async clickClear() {
    await this.clearButton.click();
  }

  async verifyFormCleared()
    {
        await expect(this.nameInput).toHaveValue('');
        await expect(this.emailInput).toHaveValue ('');
        await expect(this.companyInput).toHaveValue('');
    }
}

