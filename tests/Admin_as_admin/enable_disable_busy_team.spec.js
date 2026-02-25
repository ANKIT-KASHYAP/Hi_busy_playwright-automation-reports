import { test, expect } from '@playwright/test';
import { generateUserData } from '../utils/prepare_user_info_random_data.js';
import  {login_process} from '../utils/Common_login_process.js'

test.use({
  launchOptions: {
    slowMo: 200,
  },
});

const { userName, userEmail, userMobile } = generateUserData();
const role= 'admin';
test('test', async ({ page }) => {

      //==========login process===============
     await login_process(page,role);
     //=========login process end============
  await page.getByRole('button', { name: 'menu' }).click();
  await page.getByRole('link', { name: 'person Busy Teams' }).click();
  await page.getByRole('button', { name: 'more info' }).first().click();
 // await page.locator("//span[@class='MuiSwitch-thumb']").check();
  await page.getByLabel('', { exact: true }).uncheck();
  await page.goto('https://hiqa2.pooraa.net/busy/teams/id');
  //await page.locator('button').filter({ hasText: 'close' }).click();
//   await page.locator('.MuiPaper-root.jss162').first().click();
//   await page.getByRole('button', { name: 'Edit' }).click();
//   await page.locator('div').filter({ hasText: /^checkclose$/ }).first().click();
//   await page.getByRole('button', { name: 'Close' }).click();
  await page.getByRole('button', { name: 'Show Search Options' }).click();
  await page.getByRole('combobox').selectOption('Disabled');
  await page.getByRole('button', { name: 'Search', exact: true }).click();
  await page.locator('#root').getByText('3gwrjnk2').click();
  await expect(page.locator('#root')).toContainText('3gwrjnk2');
//   await page.getByRole('button', { name: 'Close' }).click();
//   await page.getByRole('button', { name: 'Show Search Options' }).click();
//   await page.getByRole('button', { name: 'Reset' }).click();
//   await page.getByRole('button', { name: 'more info' }).nth(1).click();
//   await page.locator('button').filter({ hasText: 'close' }).click();
});