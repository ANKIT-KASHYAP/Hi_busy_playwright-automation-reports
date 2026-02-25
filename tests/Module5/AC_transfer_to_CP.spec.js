import { test, expect } from '@playwright/test';

test.use({
  launchOptions:{
    slowMo:400,
  },
})


test('test', async ({ page }) => {
  await page.goto('https://hiqa2.pooraa.net/');
  await page.getByRole('textbox', { name: 'Email ID' }).click();
  await page.getByRole('textbox', { name: 'Email ID' }).fill('hi_hiteshmohan1@gmail.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('123456');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByRole('link', { name: 'View Wallet' }).click();
  await page.getByRole('button', { name: 'Transfer AC' }).click();
  await page.getByRole('textbox').nth(1).click();
  await page.getByRole('textbox').nth(1).fill('100');
  await page.locator('.MuiInputBase-root.MuiFilledInput-root.MuiFilledInput-underline.MuiInputBase-fullWidth.MuiInputBase-formControl.MuiInputBase-multiline').click();
  await page.getByRole('textbox').nth(2).fill('100 transfer');
  await page.getByRole('button', { name: 'Transfer Now' }).click();
  await page.getByRole('button', { name: 'OK' }).click();
  await expect(page.getByText('100ACs Successfully')).toBeVisible();
//   await page.getByText('100ACs Successfully').click();
});