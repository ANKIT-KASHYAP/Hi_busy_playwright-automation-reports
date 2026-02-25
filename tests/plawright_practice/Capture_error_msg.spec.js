import { test, expect } from '@playwright/test';
test.use({viewport:{width:1500,height:1000}});

test('test', async ({ page }) => {
  await page.locator('body').click();
  await page.goto('https://hiqa2.pooraa.net/');

  //This is how we can get size of the viewport
  //await page.viewportSize().width;
  //await page.viewportSize().height;
  console.log(page.viewportSize().width);
  console.log(page.viewportSize().height);

  await page.getByRole('textbox', { name: 'Email ID' }).click();
  await page.getByRole('textbox', { name: 'Email ID' }).fill('ankit.kashyap@mail.busy.in');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('123450');
  await page.getByRole('button', { name: 'Login' }).click();
  await expect(page.getByText('Invalid  or password')).toBeVisible();
});