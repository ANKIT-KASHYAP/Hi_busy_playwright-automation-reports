import { test, expect } from '@playwright/test';

test('TC01 - Login page title validation', async ({ page }) => {
  await page.goto('https://hiqa2.pooraa.net/');
  await page.getByRole('textbox', { name: 'Email ID' }).fill('ankit.kumar@mail.busy.in');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('123456');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page).toHaveURL('https://hiqa2.pooraa.net/busy/dashboard');
});



