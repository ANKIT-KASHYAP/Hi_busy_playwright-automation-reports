import { test, expect } from '@playwright/test';
import pool from '../../dbConfig.js'; // ✅ Import shared DB connection
import dotenv from 'dotenv';
import  {login_process} from '../utils/Common_login_process.js'

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
const role ='primary';
test('Test case 3: renew_BO_by_dashborad', async ({ page }) => {

      //==========login process===============
       await login_process(page,role);
       //=========login process end============
  await page.getByText('Online', { exact: true }).click();
  await page.getByRole('textbox', { name: 'description' }).click();
  await page.getByRole('textbox', { name: 'description' }).fill('2194083488');
  await page.getByRole('button', { name: 'Renew' }).click();
  await page.getByRole('button', { name: 'A 90 Days' }).click();
  await page.getByRole('button', { name: 'B 360 Days' }).click();
  await page.getByRole('button', { name: 'A 90 Days' }).click();
  await page.getByRole('button', { name: 'Next' }).click();

  await page.waitForTimeout(5000); // wait for 5 seconds
      // Step 3: Fetch OTPs from DB
      const { mobileOtp, emailOtp } = await fetchLatestOtps();
    
      // Step 4: Fill OTPs on UI
      await page.getByRole('textbox', { name: 'Mobile T-Code' }).fill(mobileOtp);
      await page.getByRole('textbox', { name: 'Email T-Code' }).fill(emailOtp);
    
      // Step 5: Purchase
       await page.getByRole('button', { name: 'Renew' }).last(1).click();
    
      // Step 6: Verify success message
      await expect(page.getByText('Renew Successful')).toBeVisible({ timeout: 15000 });
  
});