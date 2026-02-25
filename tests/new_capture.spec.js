import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://hiqa2.pooraa.net/');
  await page.getByRole('textbox', { name: 'Email ID' }).click();
  await page.getByRole('textbox', { name: 'Email ID' }).fill('ankit.kashyap@mail.busy.in');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('123456');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByRole('button', { name: 'menu' }).click();
  await page.getByRole('link', { name: 'perm_identity Partner' }).click();
  await page.getByRole('button', { name: 'Access Account' }).nth(3).click();
  await page.getByRole('button', { name: 'Perpetual' }).click();
  await page.getByRole('textbox').nth(4).click();
  await page.getByRole('textbox').nth(4).fill('');
  await page.getByRole('textbox').nth(3).click();
  await page.getByRole('textbox').nth(3).fill('01');
  await page.getByRole('button', { name: 'Purchase' }).click();
  await page.getByText('Insufficient balance').click();


//  await page.waitForTimeout(5000);
//   await page.getByText('Insufficient balance').click();
  
  // -----------------------------
  //  CAPTURE ERROR TOAST
  // -----------------------------
  
  const errorToast = page.getByText('Insufficient balance');

  // Wait until toast appears
  await expect(errorToast).toBeVisible({ timeout: 5000 });
  await page.getByRole('button', { name: 'Purchase' }).click();

  // Read text
  const message = await errorToast.textContent();

  console.log("Captured Error Message:", message);
});