import { test, expect } from '@playwright/test';
import { createRequire } from 'module';

const require = createRequire(import.meta.url);
//const {getTestData } =require('../plawright_practice/')
const {getTestData} = require('./Login_test_data_reading.cjs')


const testData = getTestData();
console.log(testData);
 
testData.forEach((data, index) => {
  test(`Login Test using Excel - ${index + 1}`, async ({ page }) => {
 // await page.goto('https://hiqa2.pooraa.net/');
  await page.goto(data.Server);
  await page.getByRole('textbox', { name: 'Email ID' }).click();
  await page.getByRole('textbox', { name: 'Email ID' }).fill(data.Email);
  console.log(data.Email);
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill(String(data.Password),{delay:200});
//     console.log(data.Pass);
//  await page.getByText('visibility_off', { exact: true }).click();
 

  await page.getByRole('button', { name: 'Login' }).click();
  
if (data.expected === 'pass') {
  const myurl = page.url();
  console.log('Current URL:', myurl);

  //expect(myurl).toContain('/dashboard/');
   await expect(page).toHaveURL(/dashboard/);
}

    if (data.expected === 'fail') {
      //await expect(page.getByText('Invalid username or password')).toBeVisible({timeout:5000});
       expect(page.getByText('Invalid username or password')).toBeFalsy();
    }
  
  });
});
