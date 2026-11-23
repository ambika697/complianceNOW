import { Given, setDefaultTimeout, Then, When } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { page } from '../support/hooks';
import { PracticeShopPage } from '../pages/PracticeShopPage';
import credentials from '../testdata/practice-shop.credentials.json';

setDefaultTimeout(60000);

let practiceShopPage: PracticeShopPage;

Given('I log in to the practice shop', async () => {
  practiceShopPage = new PracticeShopPage(page);
  await practiceShopPage.login(credentials.username, credentials.password);
});

When(
  'I view the available products and add {string} to the cart',
  async (productName: string) => {
    const productNames = await practiceShopPage.getProductNames();
    expect(productNames.length).toBeGreaterThan(0);
    expect(productNames).toContain(productName);
    await practiceShopPage.addProductToCart(productName);
  },
);

Then('the cart should contain {string}', async (productName: string) => {
  await practiceShopPage.openCart();
  expect(await practiceShopPage.getCartItemCount(productName)).toBe(1);
});

When(
  'I enter {string} as the delivery location and click on purchase',
  async (location: string) => {
    await practiceShopPage.enterDeliveryLocation(location);
    await practiceShopPage.clickPurchase();
  },
);

Then('I should see the success message {string}', async (message: string) => {
  await expect(page.locator('.alert-success')).toContainText(message);
});

