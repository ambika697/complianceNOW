import type { Page } from '@playwright/test';

export class PracticeFormPage {
  constructor(private readonly page: Page) {}

  async open(): Promise<void> {
    await this.page.goto('https://rahulshettyacademy.com/angularpractice/');
  }

  async submitDetails(name: string, email: string, password: string): Promise<void> {
    await this.page.getByRole('textbox').nth(0).fill(name);
    await this.page.getByRole('textbox').nth(1).fill(email);
    await this.page.getByLabel('Password').fill(password);
    await this.page.getByLabel('Employed').check();
    await this.page.getByRole('button', { name: 'Submit' }).click();
  }
}