import { Page, Locator } from '@playwright/test';

export class HomePage {
  readonly page: Page;
  readonly getInTouchButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.getInTouchButton = page.getByRole('button', { name: 'Get in Touch', exact: true });
  }

  async open() {
    await this.page.goto('https://iqzsystems.com/');
  }

  async clickGetInTouch() {
    await this.getInTouchButton.click();
  }
}

