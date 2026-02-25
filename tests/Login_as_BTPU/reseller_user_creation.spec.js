
import { test, expect } from '@playwright/test';

test.use({
    launchOptions:{
        slowMo:400,
    },
})

test('test', async ({ page }) => {
  await page.goto('https://hiqa2.pooraa.net/');
  await page.getByRole('textbox', { name: 'Email ID' }).fill('a');
  await page.getByRole('textbox', { name: 'Email ID' }).click();
  await page.getByRole('textbox', { name: 'Email ID' }).fill('ankit.kashyap@mail.busy.in');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('123456');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByRole('button', { name: 'menu' }).click();
  await page.getByRole('link', { name: 'perm_identity Partner' }).click();
  await page.getByRole('textbox', { name: 'search' }).click();
  await page.getByRole('textbox', { name: 'search' }).fill('nidhi');
  await page.getByRole('button', { name: 'Access Account' }).nth(1).click();
  await page.getByRole('button', { name: 'menu' }).click();
  await page.getByRole('link', { name: 'person Users' }).click();
  
  await page.getByRole('button', { name: 'create' }).click();
  await page.getByRole('textbox', { name: 'User Name' }).fill('third user kavita');
  await page.getByRole('textbox', { name: 'User Mobile' }).click();
  await page.getByRole('textbox', { name: 'User Mobile' }).fill('9958786757');
  await page.getByRole('textbox', { name: 'User Email' }).click();
  await page.getByRole('textbox', { name: 'User Email' }).fill('thirduser@gmail.com');
  await page.getByRole('button', { name: 'Save' }).click();
  await page.getByRole('button', { name: 'menu' }).click();
  await page.getByRole('link', { name: 'arrow_back Back' }).click();
  await page.getByRole('button', { name: 'menu' }).click();
  await page.getByRole('link', { name: 'perm_identity Partner' }).click();
  await page.getByRole('textbox', { name: 'search' }).click();
  await page.getByRole('textbox', { name: 'search' }).fill('nidhi');
  await page.getByRole('textbox', { name: 'search' }).click();
  await page.getByRole('button', { name: 'Access Account' }).nth(1).click();
  await page.getByRole('button', { name: 'menu' }).click();
  await page.getByRole('link', { name: 'person Users' }).click();
  
});