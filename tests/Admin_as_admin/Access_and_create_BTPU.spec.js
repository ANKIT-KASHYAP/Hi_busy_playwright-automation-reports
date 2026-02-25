import { test, expect } from '@playwright/test';
import { generateUserData } from '../../tests/utils/prepare_user_info_random_data.js';
import  {login_process} from '../../tests/utils/Common_login_process.js'

test.use({
  launchOptions: {
    slowMo: 200,
  },
});

const { userName, userEmail, userMobile } = generateUserData();
const role = 'admin';
test('create_BTPU(busy team preimary user role: admin): ', async ({ page }) => {
  
 //==========login process===============
 await login_process(page, role);
 //=========login process end============
  await page.getByRole('button', { name: 'menu' }).click();
  await page.getByRole('link', { name: 'person Busy Teams' }).click();
  await page.getByRole('button', { name: 'Access Account' }).nth(4).click();
  await page.getByRole('button', { name: 'menu' }).click();
  await page.waitForTimeout(4000);
  //await page.getByRole('link', { name: 'person Busy Team Users' }).click();
  await page.locator('i').filter({ hasText: 'person' }).first().click();
  //await page.getByRole('button', { name: 'create' }).click();
  await page.locator('span').filter({ hasText: 'add_circleasd' }).first().click();
  await page.getByRole('textbox', { name: 'User Name' }).click();
  await page.getByRole('textbox', { name: 'User Name' }).fill(userName);
  await page.getByRole('textbox', { name: 'User Mobile' }).click();
  await page.getByRole('textbox', { name: 'User Mobile' }).fill(userMobile);
  await page.getByRole('textbox', { name: 'User Email' }).click();
  await page.getByRole('textbox', { name: 'User Email' }).fill(userEmail);
  await page.getByRole('button', { name: 'Save' }).click();
  
  await page.getByRole('textbox', { name: 'search' }).click();
  await page.getByRole('textbox', { name: 'search' }).fill(userName);

  //check user is created with this username ?
  await expect(page.locator('#root')).toContainText(userName);

});