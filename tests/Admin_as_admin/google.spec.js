
import {test,expect} from '@playwright/test';

test('Google Title Test', async ({ page }) => {
  await page.goto('https://www.google.com');
  await expect(page).toHaveTitle(/Google/);
});