import { test } from '@playwright/test';
import { HomePage } from '../../src/pages/HomePage';

import {GetintouchPage } from '../../src/pages/GetintouchPage';

test('Get In Touch – Submit form with valid data', async ({ page }) => {
  test.info().annotations.push({
    type: 'Test Case',
    description:'Verify Success Message when submitting Get In Touch form with valid data'
  });
  const homePage = new HomePage(page);
  const getintouchPage= new GetintouchPage(page);

  await test.step('Open Home Page', async ()=> {
  await homePage.open();
  });

   await test.step('Navigte to Get In Touch Popup', async ()=> {
    await homePage.clickGetInTouch();
  });

  await test.step('Enter Valid data', async ()=> {
    await getintouchPage.enterValidDetails();
   

  });
  
  await test.step('Verify Success Message', async ()=> {
    await getintouchPage.clickSubmit();
    await getintouchPage.verifySuccessMessage();
});
});

