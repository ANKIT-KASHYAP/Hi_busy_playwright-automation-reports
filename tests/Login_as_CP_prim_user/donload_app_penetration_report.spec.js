import { test, expect } from '@playwright/test';
import  {login_process} from '../utils/Common_login_process.js'
test.use({
    launchOptions:{
        slowMo:400,
    },
})
const role = 'primary';
test('Test case 10: donload_app_penetration_report', async ({ page }) => {

      //==========login process===============
       await login_process(page,role);
       //=========login process end============
  await page.getByRole('banner').getByRole('button', { name: 'menu' }).click();
  await page.getByText('bar_chartReport').click();
  await page.getByRole('link', { name: 'App Penetration' }).click();
  await page.getByRole('button', { name: 'Submit' }).click();
  const page1Promise = page.waitForEvent('popup');
  const downloadPromise = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Download Excel' }).click();
  const page1 = await page1Promise;
  const download = await downloadPromise;
  await page.getByRole('paragraph').filter({ hasText: 'Busy Mobile App' }).click();
  await page.getByRole('combobox').first().selectOption('Channel Partner');
  await page.getByRole('button', { name: 'Submit' }).click();
  const page2Promise = page.waitForEvent('popup');
  const download1Promise = page.waitForEvent('download');
  await page.getByRole('button', { name: 'Download Excel' }).click();
  const page2 = await page2Promise;
  const download1 = await download1Promise;
  await page.getByRole('combobox').first().selectOption('Reseller');
  await page.getByRole('button', { name: 'Submit' }).click();
});