import { test, expect } from '@playwright/test';
import { createRequire } from 'module';
import  {login_process} from '../plawright_practice/Common_login_process.js'
test.use({
    launchOptions:{
        slowMo:200,
    },
})
//
const require = createRequire(import.meta.url);
//const {getTestData } =require('../plawright_practice/')
const {getTestData} = require('../plawright_practice/Login_test_data_reading.cjs')


const testData = getTestData();
console.log(testData);

const role= 'admin';
test('Assign_or_update_permission_to_a_role: By admin login ', async ({ page }) => {
  //==========login process===============
   await login_process(page,role);
   //=========login process end============
  await page.getByText('menuHello, Rajan Raman').click();
  await page.getByRole('button', { name: 'menu' }).click();
  await page.getByText('device_hubACL').click();
  await page.getByRole('link', { name: 'Role' }).click();
  await page.getByText('Busy Team').first().click();
  await page.getByRole('button', { name: 'menu' }).nth(2).click();
  await page.locator('.MuiBox-root.jss255 > .MuiFormControlLabel-root > .MuiButtonBase-root > .MuiIconButton-label > .jss247').uncheck();
  await page.locator('.MuiBox-root.jss261 > .MuiFormControlLabel-root > .MuiButtonBase-root > .MuiIconButton-label > .jss247').uncheck();
  await page.locator('.MuiBox-root.jss266 > .MuiFormControlLabel-root > .MuiButtonBase-root > .MuiIconButton-label > .jss247').check();
  await page.locator('.MuiBox-root.jss282 > .MuiFormControlLabel-root > .MuiButtonBase-root > .MuiIconButton-label > .jss247').uncheck();
  await page.locator('.MuiBox-root.jss286 > .MuiFormControlLabel-root > .MuiButtonBase-root > .MuiIconButton-label > .jss247').uncheck();
  await page.locator('.MuiBox-root.jss302 > .MuiFormControlLabel-root > .MuiButtonBase-root > .MuiIconButton-label > .jss247').uncheck();
  await page.locator('.MuiBox-root.jss304 > .MuiFormControlLabel-root > .MuiButtonBase-root > .MuiIconButton-label > .jss247').check();
  await page.locator('.MuiBox-root.jss305 > .MuiFormControlLabel-root > .MuiButtonBase-root > .MuiIconButton-label > .jss247').check();
  
  await page.getByRole('button', { name: 'Submit' }).click();
   // ✅ success message locator
  const successMsg = page.getByText('Permissions Tagged to Role');
    const msgText = await successMsg.textContent();
  console.log('✅ Success Message:', msgText);
  // wait + assertion
  await expect(successMsg).toBeVisible();
 // ✅ text read + console print


});