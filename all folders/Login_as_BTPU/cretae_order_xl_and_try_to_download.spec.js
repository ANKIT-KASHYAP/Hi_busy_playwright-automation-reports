import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://hiqa1.pooraa.net/');
  await page.getByRole('textbox', { name: 'Email ID' }).fill('a');
  await page.getByRole('textbox', { name: 'Email ID' }).click();
  await page.getByRole('textbox', { name: 'Email ID' }).fill('ankit.kashyap@mail.busy.in');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('123456');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByRole('button', { name: 'menu' }).click();
  await page.getByText('personBilling').click();
  await page.getByRole('link', { name: 'Revenue Recognition', exact: true }).click();
  await page.waitForTimeout(3000); // 2 seconds wait

  await page.getByRole('combobox').first().selectOption('Grenada');
  await page.waitForTimeout(5000);
  await page.getByRole('combobox').nth(1).selectOption('Busy Mandi');
  await page.waitForTimeout(4000);
  const page1Promise = page.waitForEvent('popup');
  await page.waitForTimeout(2000);
  await page.getByRole('button', { name: 'Submit' }).click();
  const page1 = await page1Promise;
});