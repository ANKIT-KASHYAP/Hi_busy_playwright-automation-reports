import { test, expect } from '@playwright/test';
import pool from '../../dbConfig.js'; // ✅ Import shared DB connection
import dotenv from 'dotenv';


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



test('mobile app purchase', async ({ page }) => {
  await page.goto('https://hiqa2.pooraa.net/');
  await page.getByRole('textbox', { name: 'Email ID' }).click();
  await page.getByRole('textbox', { name: 'Email ID' }).fill('hi_hiteshmohan1@gmail.com');
  await page.getByRole('textbox', { name: 'Password' }).click();
  await page.getByRole('textbox', { name: 'Password' }).fill('123456');
  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByText('Mobile').click();
  await page.getByRole('textbox', { name: 'description' }).click();
  await page.locator('div').filter({ hasText: /^NewRenew$/ }).nth(1).click();
  await page.getByRole('textbox', { name: 'description' }).fill('1246919598');
  await page.getByRole('button', { name: 'New', exact: true }).click();
  await page.getByText('Purchase New').click();
  
  await page.getByRole('button', { name: 'A 360 Days' }).click();
  await page.getByRole('button', { name: 'Next' }).click();
  await page.getByRole('textbox', { name: 'Name' }).click();
  await page.getByRole('textbox', { name: 'Name' }).fill('new mobile1');
  await page.getByRole('textbox').nth(3).click();
  await page.getByRole('textbox').nth(3).fill('7464764333');
  await page.getByRole('textbox', { name: 'Email' }).click();
  await page.getByRole('textbox', { name: 'Email' }).fill('nidhi@gmail.com');
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

  //await page.getByText('Sorry unable to process this').click();
});