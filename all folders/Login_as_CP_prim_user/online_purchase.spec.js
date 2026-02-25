import { test, expect } from '@playwright/test';
import pool from '../../dbConfig.js'; // ✅ Import shared DB connection
import dotenv from 'dotenv';
import  {login_process} from '../utils/Common_login_process.js'
import {generateUserData} from '../utils/prepare_user_info_random_data.js'
test.use({
  launchOptions:{
    slowMo:400,
  },
})

dotenv.config();


async function fetchLatestOtps() {
  const client = await pool.connect();

  try {
    // ✅ Fetch latest 2 OTPs (1st = Email, 2nd = Mobile)
    const res = await client.query(
      `SELECT otp 
       FROM subscription_otp_verification 
       ORDER BY created_at DESC 
       LIMIT 2;`
    );

    if (res.rows.length < 2) {
      throw new Error(`Expected 2 OTPs but found ${res.rows.length}`);
    }

    // ✅ Order: first row → email OTP, second row → mobile OTP
    const emailOtp = res.rows[0].otp.toString().trim();
    const mobileOtp = res.rows[1].otp.toString().trim();

    console.log(`📩 Email OTP: ${emailOtp}, 📱 Mobile OTP: ${mobileOtp}`);

    return { emailOtp, mobileOtp };
  } finally {
    client.release(); // ✅ release connection back to pool
  }
}

//-------abhi QA1 p unable to purchase errror a rhi h but QA2 p chalane ke liy tumhe dotenv file m changes krne padenge url change krna hoga tabhi otp sahi lega abhi otp QA2 ka le rha h but db to QA2 se connect h and but login to QA1 m ho tum 
const {userName,userEmail,userMobile} = generateUserData();
const role ='primary'; 
test('Test case 2: online_purchase', async ({ page }) => {

      //==========login process===============
       await login_process(page,role);
       //=========login process end============
  await page.locator('div').filter({ hasText: /^Online$/ }).first().click();
  await page.getByRole('button', { name: 'New', exact: true }).click();
  await page.getByRole('button', { name: 'A 90 Days' }).click();
  await page.getByRole('button', { name: 'Next' }).click();
  await page.getByRole('textbox', { name: 'Customer Name' }).fill(userName);
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill(userEmail);
  await page.locator('span').filter({ hasText: '+91Mobile' }).getByRole('textbox').click();
  await page.locator('span').filter({ hasText: '+91Mobile' }).getByRole('textbox').fill(userMobile);
  await page.getByRole('button', { name: 'Next' }).click();

   await page.waitForTimeout(5000); // wait for 5 seconds
    // Step 3: Fetch OTPs from DB
    const { mobileOtp, emailOtp } = await fetchLatestOtps();
  
    // Step 4: Fill OTPs on UI
    await page.getByRole('textbox', { name: 'Mobile T-Code' }).fill(mobileOtp);
    await page.getByRole('textbox', { name: 'Email T-Code' }).fill(emailOtp);
  
    // Step 5: Purchase
    await page.getByRole('button', { name: 'Purchase' }).click();
  
    // Step 6: Verify success message
    await expect(page.getByText('Purchase Successful')).toBeVisible({ timeout: 15000 });

});