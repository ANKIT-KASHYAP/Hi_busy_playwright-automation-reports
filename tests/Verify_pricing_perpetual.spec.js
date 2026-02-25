//const {test, expect} = require('@playwright/test'); --this is when use common js
// @ts-check  this is when use type: module
//test and expect are two packages (test for create the test and expect to add validation on test)
import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://hiqa2.pooraa.net/');
//   await page.locator('div').nth(4).click();
//   await page.locator('div').nth(4).click();
  await page.getByRole('textbox', { name: 'Email ID' }).fill('ankit.kashyap@mail.busy.in');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('123456');
  await page.locator('.text-center.pos-rel').click();
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByRole('button', { name: 'menu' }).click();
  await page.getByRole('link', { name: 'perm_identity Partner' }).click();
  await page.getByRole('button', { name: 'Access Account' }).nth(3).click();
  await page.getByRole('button', { name: 'Perpetual' }).click();
  await page.getByRole('textbox').first().click();
  await page.getByRole('textbox').first().fill('01');
//   const ListPrice_for_CP = await page.getByText('9999').textContent();
//    console.log(`list price is :${ListPrice_for_CP}`);
//    await page.waitForTimeout(2000);
//    const ListPrice_for_customer = await page.getByText('8499').textContent();
//    console.log(`list price is :${ListPrice_for_customer}`);

  await page.getByRole('textbox').nth(1).click();
  await page.getByRole('textbox').nth(1).fill('01');

  await page.getByRole('textbox').nth(2).click();
  await page.getByRole('textbox').nth(2).fill('01');

  await page.getByRole('textbox').nth(3).click();
  await page.getByRole('textbox').nth(3).fill('1');

  await page.getByRole('textbox').nth(4).click();
  await page.getByRole('textbox').nth(4).fill('01');

  await page.getByRole('textbox').nth(5).click();
  await page.getByRole('textbox').nth(5).fill('01');

  await page.locator('.MuiBox-root.jss421 > input').click();
  await page.locator('.MuiBox-root.jss421 > input').fill('01');

  await page.locator('.MuiBox-root.jss426 > input').click();
  await page.locator('.MuiBox-root.jss426 > input').fill('01');

  await page.getByRole('button', { name: 'Next' }).click();

  await page.getByRole('textbox').first().click();
  await page.getByRole('textbox').first().fill('01');

  await page.getByRole('textbox').nth(1).click();
  await page.getByRole('textbox').nth(1).fill('01');
});