import { test, expect } from '@playwright/test';

const sub_number = '1246679871';

test('test', async ({ page }) => {
  await page.goto('https://hiqa1.pooraa.net/');
  await page.getByRole('textbox', { name: 'Email ID' }).click();
  await page.getByRole('textbox', { name: 'Email ID' }).fill('ankit.kashyap@mail.busy.in');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('123456');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByRole('button', { name: 'menu' }).click();
  await page.getByRole('link', { name: 'perm_identity Partner' }).click();
  await page.getByRole('button', { name: 'Access Account' }).nth(2).click();
  await page.getByText('Mobile').click();
  await page.getByRole('textbox', { name: 'description' }).click();
  await page.getByRole('textbox', { name: 'description' }).fill('1246679871');
  await page.getByRole('button', { name: 'New', exact: true }).click({delay:5000});
  await page.getByRole('textbox', { name: 'description' }).click();
  await page.getByRole('textbox', { name: 'description' }).fill('1246679871');
  await page.getByRole('button', { name: 'New', exact: true }).click();
  await page.getByText('Purchase New').click();
  await page.getByRole('button', { name: 'A 360 Days' }).click();
  await page.getByText('NextPress shift + enter to').click();
  await page.getByRole('button', { name: 'Next' }).click();
  await page.getByRole('textbox', { name: 'Name' }).fill('kjh');
  await page.getByRole('textbox', { name: 'Name' }).click();
  await page.getByRole('textbox', { name: 'Name' }).fill('kjhghfg');
  await page.getByRole('textbox').nth(3).click();
  await page.getByRole('textbox').nth(3).fill('8882520239');
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('ankit.kashyap@mail.busy.in');
  await page.getByRole('button', { name: 'Next' }).click();
  await page.getByRole('textbox', { name: 'Mobile T-Code' }).click();
  await page.getByRole('textbox', { name: 'Mobile T-Code' }).fill('9449');
  await page.getByRole('textbox', { name: 'Email T-Code' }).click();
  await page.getByRole('textbox', { name: 'Email T-Code' }).fill('2718');
  await page.getByRole('button', { name: 'Purchase' }).click();
});