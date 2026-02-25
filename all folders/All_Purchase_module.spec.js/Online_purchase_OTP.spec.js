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

test('Purchase flow with OTP fetched from DB', async ({ page }) => {
  // Step 1: Login
  await page.goto('https://hiqa2.pooraa.net/');
  await page.getByRole('textbox', { name: 'Email ID' }).fill('ankit.kashyap@mail.busy.in');
  await page.getByRole('textbox', { name: 'Password' }).fill('123456');
  await page.getByRole('button', { name: 'Login' }).click();

  // Step 2: Navigate to Partner and Purchase
  await page.getByRole('button', { name: 'menu' }).click();
  await page.getByRole('link', { name: 'perm_identity Partner' }).click();
  await page.getByRole('button', { name: 'Access Account' }).nth(2).click();
  await page.locator('div').filter({ hasText: /^Mobile$/ }).first().click();
  await page.getByRole('textbox', { name: 'description' }).fill('1117075144');
  await page.getByRole('button', { name: 'New', exact: true }).click();
  //await page.getByText('Purchase New').click();
  // Step 3: Wait for "Purchase New" popup to appear
// const purchaseNewPopup = page.getByText('Purchase New');
// await purchaseNewPopup.waitFor({ state: 'visible', timeout: 5000 }); // wait max 10 sec

// Step 4: Click "Purchase New"
//await purchaseNewPopup.click();
  await page.getByRole('button', { name: 'A 360 Days' }).click();
  await page.getByRole('button', { name: 'Next' }).click();
  await page.getByRole('textbox', { name: 'Name' }).fill('ankit');
  await page.getByRole('textbox').nth(3).fill('8882520239');
  await page.getByRole('textbox', { name: 'Email' }).fill('ankit.kashyap@mail.busy.in');
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



