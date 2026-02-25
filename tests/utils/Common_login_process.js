import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';
import { createRequire } from 'module';
dotenv.config();
console.log('URL:', process.env.SERVER_QA2);

const require = createRequire(import.meta.url);

const {getLoginCredentials} = require('../plawright_practice/Reading_login_cred.cjs')

const credsArray = getLoginCredentials();
// console.log("your credentials on common login file");
// console.log(credsArray);
// console.log(credsArray[0].Server);
// console.log(credsArray[0].User_email);
// console.log(credsArray[0].User_password);

export async function login_process(page,role){

 // 🔍 Find user by ROLE
  const user = credsArray.find(
    u => u.Role.toLowerCase() === role.toLowerCase()
  );

  if (!user) {
    throw new Error(`❌ Role not found in Excel: ${role}`);
  }
  // await page.goto(process.env.SERVER_QA2);
  await page.goto(credsArray[0].Server);
  await page.getByRole('textbox', { name: 'Email ID' }).click();
  // await page.getByRole('textbox', { name: 'Email ID' }).fill(credsArray[0].User_email || '');
   await page.getByRole('textbox', { name: 'Email ID' }).fill(user.User_email || '');
  await page.getByRole('textbox', { name: 'Password' }).click();
  //await page.getByRole('textbox', { name: 'Password' }).fill(String(credsArray[0].User_password),{delay:200});
    await page.getByRole('textbox', { name: 'Password' }).fill(String(user.User_password), { delay: 150 });
  await page.getByRole('button', { name: 'Login' }).click();

}