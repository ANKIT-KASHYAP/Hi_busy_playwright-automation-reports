import { test, expect } from '@playwright/test';
import  {login_process} from '../plawright_practice/Common_login_process.js'

test.use({
  launchOptions:{
    slowMo:400,
  },
})
const role = 'primary';
test('test case 7: add_Ac_using_PG', async ({ page }) => {
    //==========login process===============
     await login_process(page,role);
     //=========login process end============
  await page.locator('div').filter({ hasText: /^View Wallet$/ }).click();
  await page.getByRole('button', { name: 'Add AC' }).click();
  await page.locator('input[type="text"]').click();
  await page.locator('input[type="text"]').fill('100000');
  await page.getByRole('button', { name: 'Pay Online' }).click();
  await page.getByRole('button', { name: 'OK' }).click();
  await page.getByRole('combobox').selectOption('{"name":"Central Bank of India","gateway_id":3,"gateway_name":"razorpay","meta":{"gateway_bank_code":"CBIN"},"display_order":13}');
  await page.getByRole('button', { name: 'Proceed' }).click();
  await page.locator('iframe').contentFrame().getByTestId('contactNumber').click();
  await page.locator('iframe').contentFrame().getByTestId('contactNumber').fill('6767656565');
  const page1Promise = page.waitForEvent('popup');
  await page.locator('iframe').contentFrame().locator('.relative.flex.min-h-12.cursor-pointer.items-center.gap-3.px-4.py-3.focus\\:border-on-surface.focus\\:border-opacity-10.d\\:gap-4.d\\:py-4.border-on-surface\\/10').click();
  const page1 = await page1Promise;
  await page1.getByRole('button', { name: 'Success' }).click();
 // await page.locator('iframe').contentFrame().getByRole('heading', { name: 'Payment Successful' }).click();
  // await page.getByText('118000.00 spent. 100000').click();
  //await expect(page.getByText('118000.00 spent. 100000')).toBeVisible({timeout:2000});
});