import { test, expect } from '@playwright/test';
import  {login_process} from '../utils/Common_login_process.js'
test.use({
    launchOptions:{
        slowMo:400,
    },
})
const role='primary';
test('Test case 9: download_sub_status_report', async ({ page }) => {
      //==========login process===============
       await login_process(page,role);
       //=========login process end============
  await page.getByRole('banner').getByRole('button', { name: 'menu' }).click();
  await page.getByText('bar_chartReport').click();
  await page.getByRole('link', { name: 'Subscription Status' }).click();
  await page.getByRole('combobox').nth(2).selectOption('Yesterday');
  await page.getByRole('combobox').nth(2).selectOption('Previous Month');
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByRole('tab', { name: 'Month Wise' }).click();
  await page.getByRole('tab', { name: 'Week Wise' }).click();
  await page.getByRole('tab', { name: 'Data' }).click();
  const page1Promise = page.waitForEvent('popup');
  const downloadPromise = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Download Excel' }).click();
  const page1 = await page1Promise;
  const download = await downloadPromise;
  await page.getByRole('combobox').first().selectOption('Channel Partner');
  await page.getByRole('combobox').nth(2).selectOption('Current Month');
  await page.getByRole('button', { name: 'Submit' }).click();
  const page2Promise = page.waitForEvent('popup');
  const download1Promise = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Download Excel' }).click();
  const page2 = await page2Promise;
  const download1 = await download1Promise;
  await page.getByRole('combobox').nth(2).selectOption('Current Quarter');
  await page.getByRole('combobox').nth(2).selectOption('Previous Quarter');
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByRole('combobox').first().selectOption('Reseller');
  await page.getByRole('button', { name: 'Submit' }).click();
  const page3Promise = page.waitForEvent('popup');
  const download2Promise = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Download Excel' }).click();
  const page3 = await page3Promise;
  const download2 = await download2Promise;
  await page.getByRole('combobox').first().selectOption('All');
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByRole('combobox').nth(2).selectOption('Current FY');
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByRole('tab', { name: 'Month Wise' }).click();
  await page.getByRole('tab', { name: 'Week Wise' }).click();
  await page.getByRole('tab', { name: 'Data' }).click();
  await page.getByRole('combobox').nth(2).selectOption('Yesterday');
  await page.getByRole('button', { name: 'Submit' }).click();
  const page4Promise = page.waitForEvent('popup');
  const download3Promise = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Download Excel' }).click();
  const page4 = await page4Promise;
  const download3 = await download3Promise;
  
});