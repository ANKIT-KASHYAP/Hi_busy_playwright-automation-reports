import { test, expect } from '@playwright/test';
test.use({
  launchOptions: {
    slowMo: 400,
  },
});


test('test', async ({ page }) => {
    test.setTimeout(120000);
  await page.goto('https://hiqa2.pooraa.net/');
  await page.getByRole('textbox', { name: 'Email ID' }).fill('ankit.kashyap@mail.busy.in');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Email ID' }).fill('ankit.kashyap@mail.busy.in1');
  await page.getByRole('textbox', { name: 'Password' }).fill('23456');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByRole('textbox', { name: 'Email ID' }).click();
  await page.getByRole('textbox', { name: 'Email ID' }).fill('ankit.kashyap@mail.busy.in');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('123456');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByRole('button', { name: 'menu' }).click();
  await page.getByRole('link', { name: 'perm_identity Partner' }).click();
  await page.getByRole('button', { name: 'create' }).click();
  await page.getByRole('textbox', { name: 'Time Zone' }).click();
  await page.getByRole('button', { name: 'Asia/Kolkata' }).click();
  await page.getByRole('button', { name: 'Add' }).click();
  await page.getByRole('textbox', { name: 'Select Partner Tier' }).click();
  await page.getByRole('button', { name: 'Platinum' }).click();
  await page.getByRole('button', { name: 'Add' }).click();
  await page.getByRole('button', { name: 'Next' }).click();
  await page.getByRole('textbox', { name: 'GSTIN' }).click();
  await page.getByRole('textbox', { name: 'GSTIN' }).fill('09DBHPS8013M1Z4');
  await page.getByRole('textbox', { name: 'Partner Name' }).click();
  await page.getByRole('textbox', { name: 'Partner Name' }).fill('vimal');
  await page.getByRole('textbox', { name: 'Partner ID' }).click();
  await page.getByRole('textbox', { name: 'Partner ID' }).fill('8365645');
  await page.getByRole('textbox', { name: 'Partner PIN' }).click();
  await page.getByRole('textbox', { name: 'Partner PIN' }).fill('188532');
  await page.getByRole('button', { name: 'Next' }).click();
  await page.locator('span').filter({ hasText: 'Pincode *' }).getByRole('textbox').click();
  await page.locator('span').filter({ hasText: 'Pincode *' }).getByRole('textbox').fill('2');
  await page.locator('span').filter({ hasText: 'Pincode *Invalid Pincode.' }).getByRole('textbox').fill('231210');
  await page.locator('.MuiInputBase-root.MuiFilledInput-root.MuiFilledInput-underline.MuiInputBase-fullWidth.MuiInputBase-formControl.MuiInputBase-multiline').click();
  await page.getByRole('textbox', { name: 'Address' }).fill('namo kassi');
  await page.getByRole('button', { name: 'Next' }).click();
  await page.getByRole('textbox', { name: 'Contact Name' }).fill('vimal kumar');
  await page.getByRole('textbox', { name: 'Contact Mobile' }).click();
  await page.getByRole('textbox', { name: 'Contact Mobile' }).fill('9895884758');
  await page.getByRole('textbox', { name: 'Contact Email' }).click();
  await page.getByRole('textbox', { name: 'Contact Email' }).fill('vimal@gmail.com');
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByRole('textbox', { name: 'search' }).click();
  await page.getByRole('textbox', { name: 'search' }).fill('vimal');
  await page.getByRole('button', { name: 'Access Account' }).click();
  await page.getByRole('banner').getByRole('button', { name: 'menu' }).click();
  await page.getByRole('link', { name: 'account_circle My Profile' }).click();
});