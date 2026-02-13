import {Page,Locator} from '@playwright/test';
export class BluebirdPage
{
    readonly page:Page;
    readonly bluebirdIcon: Locator;
    readonly inputBox:Locator;
    readonly endChat:Locator;
    readonly additionalFeedback:Locator;
    readonly blueBirdClose:Locator;

    constructor (page:Page)
    {
        this.page=page;
        this.bluebirdIcon = page.locator('.bluebird_webchatLogo__KpF_V');
        this.inputBox =page.getByRole('textbox', { name: 'Message input box' });
        this.endChat = page.getByRole('button', { name: 'End Chat' });
        this.blueBirdClose = page.getByRole('button', { name: '✕' });
    }

    async goto (url:string)
{
    await this.page.goto(url);
   
}

async checkBluebird()
{
    await this.bluebirdIcon.click;
    await this.inputBox.fill('Hi Bluebird');
    
    await this.inputBox.press('Enter');
    await this.endChat.click;
    await this.additionalFeedback.click;
    await this.blueBirdClose.click;
    
}
}
