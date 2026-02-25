import { test, expect } from '@playwright/test';
import  {login_process} from '../utils/Common_login_process.js'

test.use({
  launchOptions: {
    slowMo: 200,
  },
});

const role= 'admin';
test('create_role_dynamically: by Admin login ', async ({ page }) => {

  const AutoRole =  Math.random().toString(36).substring(2, 10);

  // 🔹 Dynamic role name
  const roleName = `${AutoRole}${Date.now()}`;
  console.log('Created Role:', roleName);

 //==========login process===============
 await login_process(page,role);
 //=========login process end============
  await page.getByRole('button', { name: 'menu' }).click();
  await page.getByText('device_hubACL').click();

  //-------------------------
  await page.getByRole('link', { name: 'Role' }).click();
  await page.getByRole('button', { name: 'create' }).click();

  // 🔹 Use dynamic name here
  await page.getByRole('textbox', { name: 'Name' }).fill(roleName);

  await page.getByRole('button', { name: 'A Primary' }).click();
  await page.getByRole('button', { name: 'A Channel Partner' }).click();
  await page.getByRole('button', { name: 'A India' }).click();
  await page.getByRole('button', { name: 'Save' }).click();

  // 🔹 Search same role dynamically
  await page.getByRole('textbox', { name: 'search' }).fill(roleName);

});
