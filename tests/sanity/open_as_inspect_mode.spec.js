import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://hiqa1.pooraa.net/');
  await page.getByRole('textbox', { name: 'Email ID' }).click();
  await page.getByRole('textbox', { name: 'Email ID' }).fill('ankit.kashyap@mail.busy.in');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('123456');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByRole('button', { name: 'menu' }).click();
  await page.getByText('personBilling').click();
  await page.getByRole('link', { name: 'Order XL' }).click();
  await page.getByRole('combobox').first().selectOption('India');
  await page.getByRole('combobox').nth(2).selectOption('Busy Desktop');
  await page.getByRole('combobox').nth(3).selectOption('Internal');
  const page1Promise = page.waitForEvent('popup');
  await page.getByRole('button', { name: 'Submit' }).click();
  const page1 = await page1Promise;
});