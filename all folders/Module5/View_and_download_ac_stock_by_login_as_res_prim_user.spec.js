import { test, expect } from '@playwright/test';

test.use({
    launchOptions:{
        slowMo:500,
    },
})

test('test', async ({ page }) => {
  await page.goto('https://hiqa2.pooraa.net/');
  await page.getByRole('textbox', { name: 'Email ID' }).click();
  await page.getByRole('textbox', { name: 'Email ID' }).fill('hi_hiteshmohan1@gmail.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('123456');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByRole('button', { name: 'menu' }).click();
  await page.getByText('bar_chartReport').click();
  await page.getByRole('link', { name: 'AC Stock' }).click();
  await page.getByRole('combobox').selectOption('Current Month');
  await page.getByRole('button', { name: 'Submit' }).click();
  const page1Promise = page.waitForEvent('popup');
  const downloadPromise = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Download Excel' }).click();
  const page1 = await page1Promise;
  const download = await downloadPromise;
  await page.getByRole('combobox').selectOption('Yesterday');
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByRole('combobox').selectOption('Current Quarter');
  await page.getByRole('button', { name: 'Submit' }).click();
  const page2Promise = page.waitForEvent('popup');
  const download1Promise = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Download Excel' }).click();
  const page2 = await page2Promise;
  const download1 = await download1Promise;
  await page.getByRole('combobox').selectOption('Previous Quarter');
  await page.getByRole('button', { name: 'Submit' }).click();
  const page3Promise = page.waitForEvent('popup');
  const download2Promise = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Download Excel' }).click();
  const page3 = await page3Promise;
  const download2 = await download2Promise;
  await page.getByRole('combobox').selectOption('Current FY');
  await page.getByRole('button', { name: 'Submit' }).click();
  const page4Promise = page.waitForEvent('popup');
  const download3Promise = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Download Excel' }).click();
  const page4 = await page4Promise;
  const download3 = await download3Promise;
  await page.getByRole('combobox').selectOption('Today');
  await page.getByRole('button', { name: 'Submit' }).click();
  const page5Promise = page.waitForEvent('popup');
  const download4Promise = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Download Excel' }).click();
  const page5 = await page5Promise;
  const download4 = await download4Promise;
});