import { test, expect } from '@playwright/test';

test.use({
    launchOptions:{
        slowMo:400,
    },
})

test('test', async ({ page }) => {
  await page.goto('https://hiqa2.pooraa.net/');
  await page.getByRole('textbox', { name: 'Email ID' }).click();
  await page.getByRole('textbox', { name: 'Email ID' }).fill('ankit.kashyap@mail.busy.in');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('123456');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByRole('button', { name: 'menu' }).click();
  await page.getByRole('link', { name: 'perm_identity Partner' }).click();
  await page.getByRole('textbox', { name: 'search' }).click();
  await page.getByRole('textbox', { name: 'search' }).fill('kuna');
  await page.goto('https://hiqa2.pooraa.net/partner/teams/id?search=kuna');
  await page.getByRole('textbox', { name: 'search' }).fill('kunal');
  await page.getByRole('button', { name: 'Access Account' }).nth(1).click();
  await page.getByRole('banner').getByRole('button', { name: 'menu' }).click();
  await page.getByRole('link', { name: 'person Users' }).click();
  await page.getByRole('button', { name: 'create' }).click();
  await page.getByRole('textbox', { name: 'User Name' }).fill('kaif primary');
  await page.getByRole('textbox', { name: 'User Mobile' }).click();
  await page.getByRole('textbox', { name: 'User Mobile' }).fill('8934867436');
  await page.getByRole('textbox', { name: 'User Email' }).click();
  await page.getByRole('textbox', { name: 'User Email' }).fill('primary@gmail.com');
  await page.getByRole('button', { name: 'Save' }).click();
  await page.getByRole('button', { name: 'create' }).click();
  await page.getByRole('textbox', { name: 'User Name' }).click();
  await page.getByRole('textbox', { name: 'User Name' }).fill('kaif secondary');
  await page.getByRole('textbox', { name: 'User Mobile' }).click();
  await page.getByRole('textbox', { name: 'User Name' }).fill('secondary user kunal7');
  await page.getByRole('textbox', { name: 'User Mobile' }).fill('8547578744');
  await page.getByRole('textbox', { name: 'User Email' }).click();
  await page.getByRole('textbox', { name: 'User Email' }).fill('kaif_secondary@gmail.com');
  await page.getByRole('button', { name: 'Save' }).click();
  await page.getByRole('button', { name: 'more info' }).nth(1).click();
  await page.locator('button').filter({ hasText: 'close' }).click();
  await page.getByRole('button', { name: 'menu' }).click();
  await page.getByRole('link', { name: 'account_circle My Profile' }).click();
  await page.getByRole('button', { name: 'menu' }).click();
  await page.getByRole('link', { name: 'person Users' }).click();
});