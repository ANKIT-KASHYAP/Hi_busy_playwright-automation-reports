/**
 * Adds balance to wallet via UI
 * @param {Page} page - Playwright page object
 * @param {string} amount - Amount to add in wallet
 * @param {string} mobileNumber - Mobile number for payment
 */

import { expect } from '@playwright/test';
  
export  async function addWalletBalance(page, amount = '150000', mobileNumber = '9876545678') {
   await page.getByRole('button', { name: 'menu' }).click();
   await page.getByRole('link', { name: 'account_circle My Profile' }).click();
  await page.getByRole('tab', { name: 'Wallet' }).click();
  await page.getByRole('button', { name: 'Add AC' }).click();
  await page.locator('input[type="text"]').click();
  await page.locator('input[type="text"]').fill(amount);
  await page.getByRole('button', { name: 'Pay Online' }).click();
  await page.getByRole('button', { name: 'OK' }).click();
  await page.getByRole('button', { name: 'Proceed' }).click();
  await page.locator('iframe').contentFrame().getByTestId('contactNumber').click();
  await page.locator('iframe').contentFrame().getByTestId('contactNumber').fill(mobileNumber);
  const page1Promise = page.waitForEvent('popup');
  await page.locator('iframe').contentFrame().locator('.relative.flex.min-h-12.cursor-pointer.items-center.gap-3.px-4.py-3.focus\\:border-on-surface.focus\\:border-opacity-10.d\\:gap-4.d\\:py-4.border-on-surface\\/10').click();
  const page1 = await page1Promise;
  //check Ac added successfully

  await page1.getByRole('button', { name: 'Success' }).click();
    
  await page.waitForTimeout(6000);
   await expect(page.locator('iframe').contentFrame().getByRole('heading', { name: 'Payment Successful' })).toBeVisible();
}

