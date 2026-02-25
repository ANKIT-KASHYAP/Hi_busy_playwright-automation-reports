//div[class='MuiBox-root jss144'] span[class='MuiTypography-root jss127 MuiTypography-body1']

//hi_3minfocare@gmail.com
//https://hiqa2.pooraa.net/

import { test, expect } from '@playwright/test';
import  {login_process} from '../utils/Common_login_process.js'

test.use({
    launchOptions:{
        slowMo:400,
    },
})
const role = 'busy';
test('Test case 1: search by sub id or mobile or email', async ({ page }) => {


    //==========login process===============
     await login_process(page,role);
     //=========login process end============
 
 // await page.locator("//span[contains(text(),'tune')]").click();  
  await page.getByRole('button', { name: 'menu' }).click();
  await page.getByRole('link', { name: 'perm_identity Partner' }).click();
  await page.getByRole('button', { name: 'Access Account' }).nth(7).click();
  await page.getByRole('banner').getByRole('button', { name: 'menu' }).click();
  await page.getByRole('link', { name: 'account_circle My Profile' }).click();
 
const gstin = await page
  .locator("//button[@aria-label='Edit']")
  .last()
  .locator("xpath=preceding-sibling::span")
  .innerText();
console.log("GSTIN:", gstin);

const textValue = await page
  .locator("//button[@aria-label='Edit']")
  .nth(3) // 4th pencil icon
  .locator("xpath=preceding-sibling::span")
  .innerText();

console.log("Value:", textValue);



});


