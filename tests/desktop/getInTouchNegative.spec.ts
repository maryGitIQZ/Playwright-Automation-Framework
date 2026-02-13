import { test } from '@playwright/test';
import { HomePage } from '../../src/pages/HomePage';
import {GetintouchPage } from '../../src/pages/GetintouchPage';
import {allure}from 'allure-playwright';

test('Get In Touch – Mandatory validation Error Messages', async ({ page }) => {
  allure.feature ('Get In Touch');
    allure.story ('Mandatory Fields Validion');
    allure.severity('Normal');

    await allure.description(`
        Scenario: To Verify Mandatory Validtion error messages
        GIVEN
        User opens Getintouch popup
        WHEN
        User does not enter any values on the required fields
        AND
        Clicks Submit button
        THEN
        System should display Mandatory validation error messages on the respective fields.
        `);
  
  test.info().annotations.push({
    type: 'Test Case',
    description:'Verify Error Messages when submitting empty Get In Touch form'
  });

  const homePage = new HomePage(page);
  const getintouchPage= new GetintouchPage(page);

  await test.step('GIVEN User is on the Home Page', async ()=> {
  await homePage.open();
  });

  await test.step('WHEN User opens the Get In Touch Popup', async ()=> {
  await homePage.clickGetInTouch();
  });
  
  await test.step(' AND Submit the form wihout enterig the data', async ()=> {
  await getintouchPage.clickSubmit();

  });
  
  await test.step('THEN System should display appropriate error messages on the respective fields', async ()=> {
      await getintouchPage.verifyMandatoryErrors();
});
});

