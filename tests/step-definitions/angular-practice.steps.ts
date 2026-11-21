import { Given, Then, When } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { page, practiceFormPage } from '../support/hooks';
import testData from '../testdata/angular-practice.json';

Given('I open the Angular practice form', async () => {
  await practiceFormPage.open();
});

When('I submit valid practice details', async () => {
  await practiceFormPage.submitDetails(testData.name, testData.email, testData.password);
});

Then('I should see the form submission success message', async () => {
  await expect(page.locator('.alert-success')).toContainText(
    'The Form has been submitted successfully!',
  );
});