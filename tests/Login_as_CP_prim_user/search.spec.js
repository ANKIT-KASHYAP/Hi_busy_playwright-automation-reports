//hi_3minfocare@gmail.com
//https://hiqa2.pooraa.net/

import { test, expect } from '@playwright/test';
import  {login_process} from '../utils/Common_login_process.js'

test.use({
    launchOptions:{
        slowMo:400,
    },
})
const role = 'primary';
test('Test case 1: search by sub id or mobile or email', async ({ page }) => {


    //==========login process===============
     await login_process(page,role);
     //=========login process end============
  await page.getByRole('textbox', { name: 'search' }).click();
  await page.getByRole('textbox', { name: 'search' }).fill('1123071286');
  await page.getByRole('textbox', { name: 'search' }).press('Enter');
  await page.waitForTimeout(5000);
  await page.getByRole('textbox', { name: 'search' }).click();
  await page.getByRole('textbox', { name: 'search' }).fill('8586873501');
  await page.getByRole('textbox', { name: 'search' }).click();
  await page.waitForTimeout(5000);
  await page.getByRole('textbox', { name: 'search' }).fill('neerajarora3879@gmail.com');
  await page.waitForTimeout(5000);
  await page.getByRole('button', { name: 'Clear Search' }).click();
  await page.waitForTimeout(5000);
  await page.locator('.MuiInputBase-root').click();
  await page.getByRole('textbox', { name: 'search' }).click();
  await page.getByRole('textbox', { name: 'search' }).fill('1121055342');
  await page.getByRole('textbox', { name: 'search' }).press('Enter');

  

});