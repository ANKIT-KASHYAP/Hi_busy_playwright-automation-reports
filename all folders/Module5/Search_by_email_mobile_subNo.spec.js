//hi_3minfocare@gmail.com
//https://hiqa2.pooraa.net/

import { test, expect } from '@playwright/test';

test.use({
    launchOptions:{
        slowMo:400,
    },
})

test('test', async ({ page }) => {
  await page.goto('https://hiqa2.pooraa.net/');
  await page.getByRole('textbox', { name: 'Email ID' }).click();
  //   login as reseller_primary_user
  await page.getByRole('textbox', { name: 'Email ID' }).fill('hi_hiteshmohan1@gmail.com');

  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('123456');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByRole('textbox', { name: 'search' }).click();
  await page.getByRole('textbox', { name: 'search' }).fill('1123071286');
  await page.getByRole('textbox', { name: 'search' }).press('Enter');
  await page.waitForTimeout(5000);
  await page.getByRole('textbox', { name: 'search' }).click();
  await page.getByRole('textbox', { name: 'search' }).fill('8586873501');
  await page.getByRole('textbox', { name: 'search' }).click();
  await page.waitForTimeout(5000);
  await page.getByRole('textbox', { name: 'search' }).fill('neerajarora3879@gmail.com');
  await page.waitForTimeout(5000);
  await page.getByRole('button', { name: 'Clear Search' }).click();
  await page.waitForTimeout(5000);
  await page.locator('.MuiInputBase-root').click();
  await page.getByRole('textbox', { name: 'search' }).click();
  await page.getByRole('textbox', { name: 'search' }).fill('1121055342');
  await page.getByRole('textbox', { name: 'search' }).press('Enter');
  
});