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
  await page.getByRole('button', { name: 'create' }).click();
  await page.getByRole('button', { name: 'B Reseller' }).click();
  await page.getByRole('textbox', { name: 'Time Zone' }).click();
  await page.getByRole('button', { name: 'Asia/Kolkata' }).click();
  await page.getByRole('button', { name: 'Add' }).click();
  await page.getByRole('button', { name: 'B Reseller' }).click();
  await page.getByRole('textbox', { name: 'Select Parent Partner' }).click();
  await page.getByRole('textbox', { name: 'search' }).click();
  await page.getByRole('textbox', { name: 'search' }).fill('kunal');
  await page.getByRole('button', { name: 'kunal 5365645 | 178532' }).click();
  await page.getByText('kunal5365645 | 1785327873767545 | kumal@gmail.comcheckAdd').click();
  await page.getByRole('button', { name: 'Add' }).click();
  await page.getByRole('textbox', { name: 'Select Partner Tier' }).click();
  await page.getByRole('button', { name: 'Platinum' }).click();
  await page.getByRole('button', { name: 'Add' }).click();
  await page.getByRole('button', { name: 'Next' }).click();
  await page.getByRole('textbox', { name: 'Partner Name' }).click();
  await page.getByRole('textbox', { name: 'Partner Name' }).fill('nidhirajput');
  await page.getByRole('textbox', { name: 'Partner ID' }).click();
  await page.getByRole('textbox', { name: 'Partner ID' }).fill('85465747');
  await page.getByRole('textbox', { name: 'Partner PIN' }).click();
  await page.getByRole('textbox', { name: 'Partner PIN' }).fill('1265454');
  await page.getByRole('button', { name: 'Next' }).click();
  await page.locator('span').filter({ hasText: 'Pincode *' }).getByRole('textbox').click();
  await page.locator('span').filter({ hasText: 'Pincode *' }).getByRole('textbox').fill('121005');
  await page.getByRole('textbox', { name: 'Address' }).click();
  await page.getByRole('textbox', { name: 'Address' }).fill('faridadbad');
  await page.getByRole('button', { name: 'Next' }).click();
  await page.getByRole('textbox', { name: 'Contact Name' }).fill('nidhi');
  await page.getByRole('textbox', { name: 'Contact Mobile' }).click();
  await page.getByRole('textbox', { name: 'Contact Mobile' }).fill('9956577577');
  await page.getByRole('textbox', { name: 'Contact Email' }).click();
  await page.getByRole('textbox', { name: 'Contact Email' }).fill('nidhi@gmail.com');
  await page.getByRole('button', { name: 'Submit' }).click();
  await page.getByRole('textbox', { name: 'search' }).click();
  await page.getByRole('textbox', { name: 'search' }).fill('nidhi');
  await page.getByText('nidhirajput85465747 |').click();
//   await page.getByText('lock_open', { exact: true })
  await page.getByRole('button', { name: 'Access Account' }).nth(1).click();
  await page.getByRole('button', { name: 'menu' }).click();
  await page.getByRole('button', { name: 'menu' }).click();
  await page.getByRole('link', { name: 'arrow_back Back' }).click();
  await page.getByRole('button', { name: 'menu' }).click();
  await page.getByRole('link', { name: 'perm_identity Partner' }).click();
  await page.getByRole('textbox', { name: 'search' }).click();
  await page.getByRole('textbox', { name: 'search' }).fill('kunal');
  await page.getByRole('button', { name: 'Access Account' }).nth(1).click();
  await page.getByRole('banner').getByRole('button', { name: 'menu' }).click();
  await page.getByRole('link', { name: 'perm_identity Resellers' }).click();
});