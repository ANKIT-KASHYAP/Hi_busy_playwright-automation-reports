import { test, expect } from '@playwright/test';

test.use({
    launchOptions:{
        slowMo:400,
    },
})

test('test', async ({ page }) => {
  await page.goto('https://hiqa2.pooraa.net/');
  await page.getByRole('textbox', { name: 'Email ID' }).fill('an');
  await page.getByRole('textbox', { name: 'Email ID' }).click();
  await page.getByRole('textbox', { name: 'Email ID' }).fill('ankit.kashyap@mail.busy.in');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('123456');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByRole('button', { name: 'menu' }).click();
  await page.getByRole('link', { name: 'perm_identity Partner' }).click();
  await page.getByRole('textbox', { name: 'search' }).click();
  await page.getByRole('textbox', { name: 'search' }).fill('3m');
  await page.getByRole('button', { name: 'Access Account' }).first().click();
  await page.getByRole('banner').getByRole('button', { name: 'menu' }).click();
  await page.getByRole('link', { name: 'account_circle My Profile' }).click();
  await page.getByRole('tab', { name: 'Wallet' }).click();
  await page.getByRole('button', { name: 'Add AC' }).click();
  await page.locator('input[type="text"]').click();
  await page.locator('input[type="text"]').fill('100000');
  await page.getByRole('button', { name: 'Pay Online' }).click();
  await page.getByRole('button', { name: 'OK' }).click();
  await page.getByRole('combobox').selectOption('{"name":"Central Bank of India","gateway_id":3,"gateway_name":"razorpay","meta":{"gateway_bank_code":"CBIN"},"display_order":13}');
  await page.getByRole('button', { name: 'Proceed' }).click();
  await page.locator('iframe').contentFrame().getByTestId('contactNumber').click();
  await page.locator('iframe').contentFrame().getByTestId('contactNumber').fill('7878789789');
  const page1Promise = page.waitForEvent('popup');
  await page.locator('iframe').contentFrame().getByTestId('Central Bank of India Netbanking').click();
  const page1 = await page1Promise;
  await page1.getByRole('button', { name: 'Success' }).click({timeout:8000});

  //await page1.waitForTimeout(5000);
//   await page.waitForTimeout(10000);
// //   await page.getByText('118000.00 spent. 100000').click();
//   expect(page.getByText('118000.00 spent. 100000')).toBeVisible();
});