import { test, chromium, expect } from '@playwright/test';

test('test', async () => {

  // -------- MAXIMIZED BROWSER WINDOW --------
  const browser = await chromium.launch({
    headless: false,
    args: ['--start-maximized']
  });

  const context = await browser.newContext({
    viewport: null,               // allow fullscreen
    deviceScaleFactor: undefined  // ← FIX: remove scale factor
  });

  const page = await context.newPage();
  // ------------------------------------------

  await page.goto('https://hiqa1.pooraa.net/');

  await page.getByRole('textbox', { name: 'Email ID' }).fill('ankit.kashyap@mail.busy.in');
  await page.getByRole('textbox', { name: 'Password' }).fill('123456');
  await page.getByRole('button', { name: 'Login' }).click();

  await page.getByRole('button', { name: 'menu' }).click();
  await page.getByRole('link', { name: 'perm_identity Partner' }).click();

  await page.getByRole('button', { name: 'Access Account' }).nth(3).click();

  await page.getByRole('button', { name: 'Perpetual' }).click();

  await page.getByRole('textbox').first().fill('01');
  await page.waitForTimeout(3000);

  // Click purchase
  await page.getByRole('button', { name: 'Purchase' }).click();

 // ---- POPUP CHECK ----
 await page.waitForTimeout(3000);
const popup = page.getByText('Insufficient Wallet Balance!');
await expect(page.getByText('Insufficient Wallet Balance!')).toHaveText("Insufficient Wallet Balance!");

const isPopupVisible = await popup.isVisible().catch(() => false);

if (isPopupVisible) {
  console.log("Popup appeared");
    // Click OK button on popup
  await page.getByRole('button', { name: 'OK' }).click();

  // Retry purchase again
  await page.getByRole('button', { name: 'Purchase' }).click();
} else {
  console.log("Popup NOT appeared");
}



  // ---------------------

});
