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

When(/^I proceed to checkout and enter "India" as the delivery location$/, async () => {
  await practiceShopPage.enterDeliveryLocation('India');
});

When('I accept the terms and purchase', async () => {
  await practiceShopPage.acceptTermsAndPurchase();
});

Then('I should see the order confirmation', async () => {
  await expect(page.getByText(/Success! Thank you!/i)).toBeVisible();
});
