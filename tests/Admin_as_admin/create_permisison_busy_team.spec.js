import { test, expect } from '@playwright/test';
import  {login_process} from '../utils/Common_login_process.js'
test.use({
    launchOptions:{
        slowMo:200,
    },
})
const role= 'admin';
test('create_permisison_busy_team: By admin login ', async ({ page }) => {
  // 🔹 Dynamic Test Data prepare username, email, phone no randomly not hardcoded
  
    const permissionName =  Math.random().toString(36).substring(2, 10);
    const permissionCode=  `${permissionName}${Date.now()}`;

   //==========login process===============
 await login_process(page,role);
 //=========login process end============
  await page.getByRole('button', { name: 'menu' }).click();
  await page.getByText('device_hubACL').click();
  await page.getByRole('link', { name: 'Permission' }).click();
  await page.getByRole('link', { name: 'menu' }).first().click();
  await page.getByRole('button', { name: 'menu' }).nth(1).click();
  await page.getByRole('textbox').first().click();
  await page.getByRole('textbox').first().fill(permissionName);
  await page.getByRole('textbox').nth(1).click();
  await page.getByRole('textbox').nth(1).fill(permissionCode);
  await page.getByRole('textbox', { name: 'Display Order' }).click();
  await page.getByRole('textbox', { name: 'Display Order' }).fill('3');
  await page.getByRole('checkbox', { name: 'Is Menu' }).check();
  await page.getByRole('button', { name: 'Save' }).click();

  const PermissionCreated = page.getByText('Permission Created');

   // wait + assertion
  await expect(PermissionCreated).toBeVisible();
 // ✅ text read + console print
  const created_msg = await PermissionCreated.textContent();
  console.log('✅ Success Message:', created_msg);

});