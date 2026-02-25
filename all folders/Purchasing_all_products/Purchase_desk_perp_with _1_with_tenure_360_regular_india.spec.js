import { test, expect } from '@playwright/test';
import { addWalletBalance } from '../../tests/utils/Add_Ac_to_wallet_via_UI_if_insufficient_balance_error_comes.spec';

//purchase 1 desk perp basic single user with tenure=360, region=india, category=regular
test.setTimeout(160000);
test.use({
  launchOptions:{
    slowMo:600,
  },
})


test('test', async ({ page }) => {
  await page.locator('body').click();
  await page.goto('https://hiqa1.pooraa.net/');
  await page.getByRole('textbox', { name: 'Email ID' }).click();
  await page.getByRole('textbox', { name: 'Email ID' }).fill('ankit.kashyap@mail.busy.in');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('123456');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByRole('button', { name: 'menu' }).click();
  await page.getByRole('link', { name: 'perm_identity Partner' }).click();
  await page.getByRole('button', { name: 'Access Account' }).nth(3).click();
  await page.getByRole('button', { name: 'Perpetual' }).click();
  await page.getByRole('textbox').first().click();
  await page.getByRole('textbox').first().fill('01');
  await page.getByRole('button', { name: 'Purchase' }).click();
//-----------------------------------------------------------------------------

// ---------- AFTER CLICKING PURCHASE BUTTON ----------

// Locators
const creditLimitPopup = page.getByText('Credit Limit');
const creditLimitOkBtn = page.getByRole('button', { name: 'OK' });

const insufficientBalanceToast = page.getByText('Insufficient balance');

// ---- CONDITION HANDLING ----
if (await creditLimitPopup.isVisible({ timeout: 5000 }).catch(() => false)) {

  console.log('⚠️ Credit limit popup detected');
  await creditLimitOkBtn.click();
  console.log('✅ Clicked on Credit Limit OK button');

}
else if (await insufficientBalanceToast.isVisible({ timeout: 5000 }).catch(() => false)) {

  console.log('❌ Insufficient balance detected');

  // ---- STEP 1: ADD WALLET BALANCE ----
await addWalletBalance(page, '50000', '9876453820');


//--------------------------------------------------------------------
  //STEP 2: Re-purchase --start
  await page.getByRole('button', { name: 'menu' }).click();
  await page.getByRole('link', { name: 'dashboard Dashboard' }).click();
  await page.getByRole('button', { name: 'Perpetual' }).click();
  await page.getByRole('textbox').first().click();
  await page.getByRole('textbox').first().fill('01');
  await page.getByRole('button', { name: 'Purchase' }).click();
  
 // await page.getByRole('heading', { name: 'Desktop - Purchase Successful' }).click();
 await expect(page.getByRole('heading', { name: 'Desktop - Purchase Successful' })).toBeVisible();
  const sub_no = page.getByText('button', { name: 'copy' }).first();
  console.log("purchased subscription no is==>"+sub_no);

  //---------Re-purchase end--------------

}
// else {
//   console.log('✅ No popup or toast detected, flow continues normally');
// }


//--------------------------------if insufficient balance error comes then do thse 2 steps------------------
//1.add ac in to wallet via UI
//2.then again re_purchase
  //await expect(page.getByText('Insufficient balance')).isVisible();
//   await page.getByText('Insufficient balance').click();
 

});