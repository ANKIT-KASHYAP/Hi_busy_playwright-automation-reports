import { test,expect } from '@playwright/test';
import verifyEmailandSmsOn_NewSecondaryuserCreated from './verify_email_and_msg_after_secondary_user_created.js'
import  {login_process} from '../utils/Common_login_process.js'
import {generateUserData} from '../utils/prepare_user_info_random_data.js'

test.use({
  launchOptions:{
    slowMo:600,
  },
})
   
    
const {userName,userEmail,userMobile} = generateUserData();
const role = 'primary';
test('Test case 12: Cp_secondary_user_creation', async ({ page }) => {
      //==========login process===============
       await login_process(page,role);
       //=========login process end============
  await page.getByRole('banner').getByRole('button', { name: 'menu' }).click();
  await page.getByRole('link', { name: 'person Users' }).click();
  await page.getByRole('button', { name: 'create' }).click();
  await page.getByRole('textbox', { name: 'User Name' }).click();
  await page.getByRole('textbox', { name: 'User Name' }).fill(userName);
  await page.getByRole('textbox', { name: 'User Mobile' }).click();
  await page.getByRole('textbox', { name: 'User Mobile' }).fill(userMobile);
  await page.getByRole('textbox', { name: 'User Email' }).click();
  await page.getByRole('textbox', { name: 'User Email' }).fill(userEmail);
  await page.getByRole('button', { name: 'Save' }).click();
  await page.getByRole('textbox', { name: 'search' }).click();
  await page.getByRole('textbox', { name: 'search' }).fill(userName);


//  await page.waitForTimeout(30000); // 30 seconds
 const result = await verifyEmailandSmsOn_NewSecondaryuserCreated();

// 📌 poora result dekho
console.log('🔍 Notification Result:', result);

if (result.success) {
  console.log(
    `✅ User created successfully via ${result.channel} by ${result.createdBy}`
  );
} else {
  console.log('❌ Sorry, user creation notification failed');
}

});



