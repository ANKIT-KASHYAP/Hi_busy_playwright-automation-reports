import { test, expect } from '@playwright/test';

test.use({
    launchOptions:{
        slowMo:500,
    },
})

test('test', async ({ page }) => {
  await page.goto('https://hiqa2.pooraa.net/');
  await page.getByRole('textbox', { name: 'Email ID' }).click();
  await page.getByRole('textbox', { name: 'Email ID' }).fill('hi_hiteshmohan1@gmail.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('123456');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByRole('button', { name: 'menu' }).click();
  await page.getByRole('link', { name: 'person Users' }).click();
  await page.getByRole('button', { name: 'create' }).click();
  await page.getByRole('textbox', { name: 'User Name' }).click();
  await page.getByRole('textbox', { name: 'User Name' }).fill('anita');
  await page.getByRole('textbox', { name: 'User Mobile' }).click();
  await page.getByRole('textbox', { name: 'User Mobile' }).fill('7789674523');
  await page.getByRole('textbox', { name: 'User Email' }).click();
  await page.getByRole('textbox', { name: 'User Email' }).fill('anita@gmail.com');
  await page.getByRole('button', { name: 'Save' }).click();
  await page.getByText('sec_user1').click();
  await page.getByRole('textbox', { name: 'search' }).click();
  await page.getByRole('textbox', { name: 'search' }).fill('anita');
  await page.getByRole('textbox', { name: 'search' }).press('Enter');
  await page.getByText('result').click();
  
});