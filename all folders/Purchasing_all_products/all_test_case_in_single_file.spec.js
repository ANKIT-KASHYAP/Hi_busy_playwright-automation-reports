import { test, expect } from '@playwright/test';
import { addWalletBalance } from '../../tests/utils/Add_Ac_to_wallet_via_UI_if_insufficient_balance_error_comes.spec';



test.setTimeout(160000);
test.use({
  launchOptions:{
    slowMo:600,
  },
})

async function selectPerpetualAndPurchase(page, {
  tenure = '1080',
  category = 'CA',
  quantity = '01',
} = {}) {

  await page.getByRole('button', { name: 'Perpetual' }).click();
  await page.getByRole('combobox').first().selectOption(tenure);
  await page.getByRole('combobox').nth(2).selectOption(category);
  await page.getByRole('textbox').first().fill(quantity);

  await page.getByRole('button', { name: 'Purchase' }).click();
}

test.describe('Perpetual Purchase Scenarios', () => {

  // ---------------- COMMON LOGIN ----------------
  test.beforeEach(async ({ page }) => {
    await page.goto('https://hiqa2.pooraa.net/');
    await page.getByRole('textbox', { name: 'Email ID' }).fill('ankit.kashyap@mail.busy.in');
    await page.getByRole('textbox', { name: 'Password' }).fill('123456');
    await page.getByRole('button', { name: 'Login' }).click();

    await page.getByRole('button', { name: 'menu' }).click();
    await page.getByRole('link', { name: 'perm_identity Partner' }).click();
    await page.getByRole('button', { name: 'Access Account' }).nth(3).click();
  });

  // ---------------- TC 01 ----------------
  test('TC_01:Positive_test_case, Purchase – Credit Limit Popup Handling', async ({ page }) => {
    // await page.getByRole('button', { name: 'Perpetual' }).click();
    // await page.getByRole('combobox').first().selectOption('1080');
    // await page.getByRole('combobox').nth(2).selectOption('CA');
    // await page.getByRole('textbox').first().fill('01');

    // await page.getByRole('button', { name: 'Purchase' }).click();
    await selectPerpetualAndPurchase(page);
   //custom call
   //await selectPerpetualAndPurchase(page, { tenure: '360',category: 'FOC',quantity: '02',});


    const creditLimitPopup = page.getByText('Credit Limit');

    if (await creditLimitPopup.isVisible({ timeout: 5000 }).catch(() => false)) {
      await page.getByRole('button', { name: 'OK' }).click();
      console.log('✅ Credit limit popup handled');
    }
  });

  // ---------------- TC 02 ----------------
  test('TC_02: Positive tescase, Purchase – Insufficient Balance → Wallet Top-up → Re-Purchase', async ({ page }) => {
    // await page.getByRole('button', { name: 'Perpetual' }).click();
    // await page.getByRole('combobox').first().selectOption('1080');
    // await page.getByRole('combobox').nth(2).selectOption('CA');
    // await page.getByRole('textbox').first().fill('01');

    // await page.getByRole('button', { name: 'Purchase' }).click();

      await selectPerpetualAndPurchase(page);

    const insufficientBalanceToast = page.getByText('Insufficient balance');

    if (await insufficientBalanceToast.isVisible({ timeout: 5000 }).catch(() => false)) {
      console.log('❌ Insufficient balance detected');

      // STEP 1: Add wallet balance
      await addWalletBalance(page, '50000', '9876453820');
      //re-purchase
      await selectPerpetualAndPurchase(page);

      await expect(
        page.getByRole('heading', { name: 'Desktop - Purchase Successful' })
      ).toBeVisible();

      console.log('✅ Purchase successful after wallet top-up');
    }
  });

  // ---------------- TC 03 ----------------
  test('TC_03: Positive tescase Direct Successful Purchase (No Popup)', async ({ page }) => {
    // await page.getByRole('button', { name: 'Perpetual' }).click();
    // await page.getByRole('combobox').first().selectOption('1080');
    // await page.getByRole('combobox').nth(2).selectOption('CA');
    // await page.getByRole('textbox').first().fill('01');

    // await page.getByRole('button', { name: 'Purchase' }).click();
      await selectPerpetualAndPurchase(page);

    await expect(page.getByRole('heading', { name: 'Desktop - Purchase Successful' })).toBeVisible();

    console.log('✅ Direct purchase successful');
  });

  //--Please enter Purchase Qty

   test('TC_04: Negative tescase Direct Successful Purchase (No Popup)-without filling Quantity and hit purchase btn', async ({ page }) => {
    await page.getByRole('button', { name: 'Perpetual' }).click();
    await page.getByRole('combobox').first().selectOption('1080');
    await page.getByRole('combobox').nth(2).selectOption('CA');
    //await page.getByRole('textbox').first().fill('01');

    await page.getByRole('button', { name: 'Purchase' }).click();
    //   await selectPerpetualAndPurchase(page);
      // ❌ If this error appears → test should FAIL
  await expect( page.getByText('Please enter Purchase Qty')).toBeVisible({ timeout: 5000 });
    // await expect(page.getByRole('heading', { name: 'Desktop - Purchase Successful' })).toBeVisible();
    // console.log('✅ Direct purchase successful');
  });

});
