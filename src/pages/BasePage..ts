import {Page,Locator} from '@playwright/test';
/* Base page is the Parent class for all page objects 
 * Contains common methods used across all pages
*/

export class BasePage
{
    protected page: Page;

    constructor(page: Page)
    {
        this.page =page;
    }

    /* Navigates to a specific url
    @param url -url navigates to
    */
   async navigateTo(url:string): Promise<void>
   {
    await this.page.goto(url);
   }

   
    /* Click on Element
    @param selector -Element Selector
    */
    async click(selector:string): Promise<void>
   {
    await this.page.click(selector);
   }

   /* Fill Input Field
    @param selector -Element Selector
    @param text - Text to Fill
    */
    async fill(selector:string, text:string): Promise<void>
   {
    await this.page.fill(selector,text);
   }

   
   /* Get element text
    @param selector -Element Selector
    @returns Element text content
    */
   async getText(selector:string): Promise <string | null>
   {
    return await this.page.textContent(selector);
   }

   /* Get Locator for the Element
    @param selector -Element Selector
    @returns Locator Object
    */
  getLocator(selector:string): Locator
   {
    return this.page.locator(selector);
   }


   /* Hover Over the Element
    @param selector -Element Selector
    
    */
   async hover(selector:string): Promise<void>
   {
    await this.page.hover(selector);
   }

   /* Get attribute value
    @param selector -Element Selector
    @param attribute - Attrbute Name
    @returns Attribute value
    */
   async getAttribute(selector:string, attribute:string): Promise <string | null>
   {
    return await this.page.getAttribute(selector,attribute);
   }

    /* Get page title
    @returns Page title
    */
  async getPageTitle(): Promise <string>
   {
    return await this.page.title();
   }

   /* Take Screenshot
    @param file
    name - screenshot file name
    */
  async takeScrenshot(filenmae:string): Promise <void>
   {
     await this.page.screenshot({path: filenmae, fullPage:true});
   }
   
   /* Press the key
    @param key - Key to press
   */
   async pressKey(key:string): Promise<void>
   {
    await this.page.keyboard.press(key);
   } 

   
   /* Wait for element to be visisble
    @param selector -Element Selector
    @param timeout -wait timeout in milliseconds
   */
   async waitForElement(selector:string,timeout:number=5000): Promise<void>
   {
    await this.page.waitForSelector(selector, { state:'visible',timeout} );
   } 

   /* check if element is visisble
    @param selector -Element Selector
    @returns true if visible, false otherwise
   */
   async isVisible(selector:string): Promise<boolean>
   {
    try {
         await this.page.waitForSelector(selector, {state:'visible',timeout:2000} );
         return true;
    } catch {
        return false;
    }
   } 
  
   
   /* Wait for page to load
   */
   async waitForPageLoad(): Promise<void>
   {
    await this.page.waitForLoadState('networkidle');
   }

   /* Scroll to element
   @param selector -Element Selector
   */
  async scrollToElement(selector: string): Promise<void>
  {
    await this.page.locator(selector).scrollIntoViewIfNeeded();
  }

   /* Select Option from Dropdown
   @param selector - Dropdown Selector
   @param value -Option value to select
   */
  async selectDropown(selector: string, value: string): Promise<void>
  {
    await this.page.selectOption(selector,value);
  }

  /* Get Current Url
   @returns current page URL
   */
  async getCurrentUrl(): Promise<string>
  {
    return this.page.url();
  }

  /* clear input field
   @param selector -Element selector
   */
  async clearField(selector: string): Promise<void>
  {
    await this.page.fill(selector,'');
  }
 
}
