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
  await page.getByText('personBilling').click();
  await page.waitForTimeout(5000);
  await page.getByRole('link', { name: 'download Download' }).click();
  const page1Promise = page.waitForEvent('popup');
  const downloadPromise = page.waitForEvent('download');
  await page.waitForTimeout(5000);
  await page.getByRole('row', { name: '106116 Revenue Recognition' }).getByRole('button').click();
  const page1 = await page1Promise;
  const download = await downloadPromise;
  const page2Promise = page.waitForEvent('popup');
  const download1Promise = page.waitForEvent('download');
  await page.getByRole('row', { name: '106117 Revenue Recognition' }).getByRole('button').click();
 await page.waitForTimeout(5000);
});