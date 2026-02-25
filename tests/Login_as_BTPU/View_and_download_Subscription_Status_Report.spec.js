import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  
  test.setTimeout(120000);
  await page.goto('https://hiqa2.pooraa.net/');
  await page.getByRole('textbox', { name: 'Email ID' }).click();
  await page.getByRole('textbox', { name: 'Email ID' }).fill('ankit.kashyap@mail.busy.in');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('123456');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByRole('button', { name: 'menu' }).click();
  await page.getByText('bar_chartReport').click();
  await page.getByRole('link', { name: 'Subscription Status' }).click();
  await page.getByRole('combobox').first().selectOption('Channel Partner');
//   await page.getByRole('combobox').nth(3).selectOption('Delhi');
  await page.getByRole('combobox').nth(5).selectOption('Previous Month');
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.waitForTimeout(5000);

  const page1Promise = page.waitForEvent('popup');
   await page.waitForTimeout(5000);
  const downloadPromise = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Download Excel' }).click();
   await page.waitForTimeout(5000);
  const page1 = await page1Promise;
  const download = await downloadPromise;
  await page.getByRole('combobox').first().selectOption('Reseller');
  await page.getByRole('combobox').nth(5).selectOption('Current Month');
  await page.getByRole('button', { name: 'Submit' }).click();
   await page.waitForTimeout(5000);
  await page.getByRole('button', { name: 'Download Excel' }).click();
  await page.getByRole('combobox').nth(5).selectOption('Previous Month');
  await page.getByRole('button', { name: 'Submit' }).click();

   await page.waitForTimeout(5000);
  const page2Promise = page.waitForEvent('popup');
  const download1Promise = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Download Excel' }).click();

  
  const page2 = await page2Promise;
  const download1 = await download1Promise;
  await page.getByRole('combobox').first().selectOption('All');
  await page.getByRole('combobox').nth(1).selectOption('Germany');
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByRole('combobox').nth(1).selectOption('India');
  await page.getByRole('button', { name: 'Submit' }).click();

  
  const page3Promise = page.waitForEvent('popup');
  const download2Promise = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Download Excel' }).click();
  const page3 = await page3Promise;
  const download2 = await download2Promise;
  await page.getByRole('tab', { name: 'Month Wise' }).click();
  await page.getByRole('tab', { name: 'Week Wise' }).click();
  await page.getByRole('tab', { name: 'Month Wise' }).click();
  await page.getByRole('tab', { name: 'Data' }).click();
  await page.getByRole('tab', { name: 'Month Wise' }).click();
  await page.getByRole('tab', { name: 'Data' }).click();
});