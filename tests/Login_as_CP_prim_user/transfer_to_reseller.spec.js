import { test, expect } from '@playwright/test';
import  {login_process} from '../utils/Common_login_process.js'
test.use({
  launchOptions:{
    slowMo:400,
  },
})


const role ='primary';
test('Test case 11: transfer_to_reseller', async ({ page }) => {

      //==========login process===============
       await login_process(page,role);
       //=========login process end============
  await page.getByRole('link', { name: 'View Wallet' }).click();
  await page.getByRole('button', { name: 'Transfer AC' }).click();
  await page.getByRole('textbox').first().click();
  await page.getByRole('button', { name: 'EWAY HM' }).click();
  await page.getByRole('textbox').nth(1).click();
  await page.getByRole('textbox').nth(1).fill('1000');
  await page.getByRole('textbox').nth(2).click();
  await page.getByRole('textbox').nth(2).fill('i am paying 100 ');
  await page.getByRole('button', { name: 'Transfer Now' }).click();
  await page.getByRole('button', { name: 'OK' }).click();
  await page.getByRole('button', { name: 'menu' }).click();
  await page.getByRole('link', { name: 'perm_identity Resellers' }).click();
  await page.locator('div:nth-child(2) > .MuiPaper-root').click();
  await page.getByText('hi_hiteshmohan1@gmail.com').click();
  await page.getByRole('button', { name: 'menu' }).click();
  await page.getByText('power_settings_newLog out').click();
  await page.getByRole('textbox', { name: 'Email ID' }).click();
   await page.getByRole('textbox', { name: 'Email ID' }).fill('hi_hiteshmohan1@gmail.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('123456');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByRole('link', { name: 'View Wallet' }).click();
  //await page.waitForTimeout(5000);
  //await expect(page.getByText('ACs Received from: 3M Overseas')).toBeVisible({timeout:5000});
});