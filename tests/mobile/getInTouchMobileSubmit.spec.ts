import { test } from '@playwright/test';
import { HomePage } from '../../src/pages/HomePage';

import {GetintouchPage } from '../../src/pages/GetintouchPage';

test('Get In Touch Submit -Verify Successful Submit', async ({ page , isMobile}) => {
  
    const homePage = new HomePage(page);
    const getintouchPage= new GetintouchPage(page);
    await homePage.open();
 
  if (isMobile)
  {
    const menuButton=page.getByLabel('menu');
    const getInTouchLink =page.locator('#navbarBasicExample').getByRole('button', { name: 'Get In Touch' });

    await menuButton.click();
    await getInTouchLink.click();
    
  }

  await getintouchPage.enterValidDetails();
  await getintouchPage.clickSubmit();
  await getintouchPage.verifySuccessMessage();
});

