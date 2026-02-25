import { test } from '@playwright/test';

test('login once and save session', async ({ page }) => {
  await page.goto('https://hiqa1.pooraa.net/');

  await page.getByRole('textbox', { name: 'Email ID' })
    .fill(process.env.USER_EMAIL);

  await page.getByRole('textbox', { name: 'Password' })
    .fill(process.env.USER_PASSWORD);

  await page.getByRole('button', { name: 'Login' }).click();

  // wait till dashboard loads
  await page.waitForURL('**/dashboard**');

  // 🔥 SAVE LOGIN STATE
  await page.context().storageState({ path: 'auth.json' });
});
