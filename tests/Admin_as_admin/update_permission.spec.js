import { test, expect } from '@playwright/test';
import  {login_process} from '../utils/Common_login_process.js'


test.use({
  launchOptions: {
    slowMo: 200,
  },
});
const role= 'admin';
test('update_permission: By admin login', async ({ page }) => {
  const permissionName =  Math.random().toString(36).substring(2, 10);
  const DisplayOrder_value = Math.floor(Math.random() * 5) + 1;
  const dispOrder = String(DisplayOrder_value);

   //==========login process===============
 await login_process(page,role);
 //=========login process end============
  await page.getByRole('button', { name: 'menu' }).click();
  await page.getByText('device_hubACL').click();
  await page.getByRole('link', { name: 'Permission' }).click();
  await page.getByRole('link', { name: 'menu' }).first().click();
  await page.locator('button').filter({ hasText: 'edit' }).nth(3).click();
  await page.getByRole('textbox').first().click();
  await page.getByRole('textbox').first().fill(permissionName);
  await page.getByRole('textbox', { name: 'Display Order' }).click();
  await page.getByRole('textbox', { name: 'Display Order' }).clear();
  await page.getByRole('textbox', { name: 'Display Order' }).fill(dispOrder);
  await page.getByRole('button', { name: 'Update' }).click();
  const permsion_updated = page.getByText('Permission Updated');
  await expect(permsion_updated).toBeVisible();
  const text_updated = await permsion_updated.textContent();
  console.log("permission updated successfully::"+text_updated);
});