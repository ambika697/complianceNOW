import { After, Before } from '@cucumber/cucumber';
import { chromium, type Browser, type Page } from '@playwright/test';
import { PracticeFormPage } from '../pages/PracticeFormPage';

let browser: Browser;
export let page: Page;
export let practiceFormPage: PracticeFormPage;

Before(async () => {
  browser = await chromium.launch({ headless: false });
  page = await browser.newPage();
  practiceFormPage = new PracticeFormPage(page);
});

After(async () => {
  await browser?.close();
});