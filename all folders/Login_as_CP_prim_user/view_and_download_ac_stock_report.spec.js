import { test, expect } from '@playwright/test';
import  {login_process} from '../plawright_practice/Common_login_process.js'

test.use({
  launchOptions:{
    slowMo:500,
  },
})
const role ='primary';
test('Test case 8: view_and_download_ac_stock_report', async ({ page }) => {

      //==========login process===============
       await login_process(page,role);
       //=========login process end============
  await page.getByRole('banner').getByRole('button', { name: 'menu' }).click();
  await page.getByText('bar_chartReport').click();
  await page.getByRole('link', { name: 'AC Stock' }).click();
  await page.getByRole('combobox').nth(1).selectOption('Previous Month');
  await page.getByRole('button', { name: 'Submit' }).click();
  //const page1Promise = page.waitForEvent('popup');
  //const downloadPromise = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Download Excel' }).click();

  //await expect(page.getByText('sucess')).toBeVisible({timeout:5000});
  //const page1 = await page1Promise;
  //const download = await downloadPromise;
  await page.getByRole('combobox').first().selectOption('Channel Partner');
  await page.getByRole('button', { name: 'Submit' }).click();
  // const page2Promise = page.waitForEvent('popup');
  // const download1Promise = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Download Excel' }).click();
//await expect(page.getByText('sucess')).toBeVisible({timeout:5000});

  // const page2 = await page2Promise;
  // const download1 = await download1Promise;
  await page.getByRole('combobox').first().selectOption('Reseller');
  await page.getByRole('combobox').nth(1).selectOption('Yesterday');
  await page.getByRole('combobox').nth(1).selectOption('Current Month');
  await page.getByRole('button', { name: 'Submit' }).click();
  const page3Promise = page.waitForEvent('popup');
  const download2Promise = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Download Excel' }).click();

  //await expect(page.getByText('sucess')).toBeVisible({timeout:5000});
  const page3 = await page3Promise;
  const download2 = await download2Promise;
});