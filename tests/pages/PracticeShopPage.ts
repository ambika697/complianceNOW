import { expect, type Locator, type Page } from '@playwright/test';

export class PracticeShopPage {
  constructor(private readonly page: Page) {}

  async login(username: string, password: string): Promise<void> {
    await this.page.goto('https://rahulshettyacademy.com/loginpagePractise/', {
      waitUntil: 'domcontentloaded',
    });
    await this.page.getByLabel('Username:').fill(username);
    await this.page.getByLabel('Password:').fill(password);
    await this.page.getByRole('radio', { name: 'User' }).check();
    await this.page.getByRole('button', { name: 'Okay' }).click();
    await this.page.getByRole('checkbox', { name: 'I Agree to the terms and conditions' }).check();
    await this.page.getByRole('button', { name: 'Sign In' }).click();
    await this.page.locator('.card-title').first().waitFor();
  }

  async getProductNames(): Promise<string[]> {
    const productNames = await this.page.locator('.card-title').allTextContents();
    return productNames.map((name) => name.trim());
  }

  async addProductToCart(productName: string): Promise<void> {
    const productCard = this.page
      .locator('app-card')
      .filter({ has: this.page.getByRole('link', { name: productName, exact: true }) });
    await productCard.getByRole('button', { name: 'Add' }).click();
  }

  async openCart(): Promise<void> {
    await this.page.locator("//a[contains(text(),'Checkout')]").click({ timeout: 10000 });
    await this.page.locator('table tbody tr').first().waitFor({ timeout: 10000 });
  }

  async getCartItemCount(productName: string): Promise<number> {
    return this.page.locator('table tbody tr').filter({ hasText: productName }).count();
  }

  async enterDeliveryLocation(location: string): Promise<void> {
    await this.page.getByRole('button', { name: 'Checkout' }).click();
    await this.page.locator('#country').fill(location);
  }

  async acceptTermsAndPurchase() {
    const checkbox = await this.page.locator("//*[contains(text(),'I agree with the ')]")
    await checkbox.check();

    expect(await checkbox).toBeChecked();
    await this.page.locator("//button[@class='btn btn-info']").click()


    
    await this.page.getByRole('button', { name: 'Purchase' }).click();
}
}
