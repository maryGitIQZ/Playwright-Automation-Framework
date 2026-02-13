import { test } from '@playwright/test';
import { HomePage } from '../../src/pages/HomePage';
import {allure}from 'allure-playwright';
import {GetintouchPage } from '../../src/pages/GetintouchPage';

test('Get In Touch – Clear button should Reset all fields', async ({ page }) => {
    allure.feature ('Get In Touch');
    allure.story ('Successful Clear Action');
    allure.severity('Normal');

    await allure.description (`
        Scenario: To verify the Clear button functionality
        GIVEN
        User is on the Home page and Navigates to Get In touch Popup.
        WHEN
        User enters valid details on the required fields 
        AND 
        Clicks Clear button
        THEN System should clear the values entered on the fields.
        `);

   test.info().annotations.push({
    type: 'Test Case',
    description:'Validate Clear button functionality'
  }); 
  
    const homePage = new HomePage(page);
    const getintouchPage= new GetintouchPage(page);

    await allure.step('GIVEN User is on the Home page and navigates to Get In Touch Popup.' , async ()=> {
    await homePage.open();
    await homePage.clickGetInTouch();
  });

   await allure.step('WHEN User enters valid details on the required fields and Clicks Clear button.', async ()=> {
    await getintouchPage.enterValidDetails();
    await getintouchPage.clickClear();
  });

    await allure.step('THEN System should clear the values entered on the fields ', async ()=> { 
    await getintouchPage.verifyFormCleared();
});
});


