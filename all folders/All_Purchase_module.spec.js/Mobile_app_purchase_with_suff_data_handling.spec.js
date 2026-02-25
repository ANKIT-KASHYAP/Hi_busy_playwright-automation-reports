import { test, expect } from '@playwright/test';
import pool from '../../dbConfig.js';
import dotenv from 'dotenv';

test.setTimeout(160000);
test.use({
  launchOptions:{
    slowMo:400,
  },
})


dotenv.config();

//------------------ OTP Fetch ------------------
async function fetchLatestOtps() {
  const client = await pool.connect();
  try {
    const res = await client.query(
      `SELECT otp FROM subscription_otp_verification ORDER BY created_at desc limit;`
    );
    if (res.rows.length < 2) throw new Error(`Expected 2 OTPs but found ${res.rows.length}`);
    const emailOtp = res.rows[0].otp.toString().trim();
    const mobileOtp = res.rows[1].otp.toString().trim();
    console.log(`📩 Email OTP: ${emailOtp}, 📱 Mobile OTP: ${mobileOtp}`);
    return { emailOtp, mobileOtp };
  } finally {
    client.release();
  }
}




// ------------------ Wallet Helpers ------------------
async function getWalletAmount(partnerId) {
  const client = await pool.connect();
  try {
    const res = await client.query(
      "SELECT amount FROM wallet WHERE fk_channel_partner_id = $1",
      [partnerId]
    );
    return res.rows[0]?.amount || 0;
  } finally {
    client.release();
  }
}

async function updateWalletAmount(partnerId, newAmount) {
  const client = await pool.connect();
  try {
    await client.query(
      "UPDATE wallet SET amount = $1 WHERE fk_channel_partner_id = $2",
      [newAmount, partnerId]
    );
  } finally {
    client.release();
  }
}

// ------------------ Test ------------------
test('Purchase flow with OTP, auto wallet top-up, and credit limit handling', async ({ page }) => {
  const partnerId = '749';

  // Step 1: Login
  await page.goto('https://hiqa1.pooraa.net/');
  await page.getByRole('textbox', { name: 'Email ID' }).fill('ankit.kashyap@mail.busy.in');
  await page.getByRole('textbox', { name: 'Password' }).fill('123456');
  await page.getByRole('button', { name: 'Login' }).click();

  // Step 2: Navigate to Partner
  await page.getByRole('button', { name: 'menu' }).click();
  await page.getByRole('link', { name: 'perm_identity Partner' }).click();
  await page.getByRole('button', { name: 'Access Account' }).nth(3).click();
  await page.locator('div').filter({ hasText: /^Mobile$/ }).first().click();
  await page.getByRole('textbox', { name: 'description' }).fill('1216394129');
  await page.getByRole('button', { name: 'New', exact: true }).click();

  await page.getByRole('button', { name: 'A 360 Days' }).click();
  await page.getByRole('button', { name: 'Next' }).click();
  await page.getByRole('textbox', { name: 'Name' }).fill('ankit');
  await page.getByRole('textbox').nth(3).fill('8882520239');
  await page.getByRole('textbox', { name: 'Email' }).fill('ankit.kashyap@mail.busy.in');
  await page.getByRole('button', { name: 'Next' }).click();

  // ----------- Step 3: Check Insufficient Balance after Next click -----------
  const insufficient1 = await page.locator('text=Insufficient balance').isVisible();
  if (insufficient1) {
    console.log('⚠️ Insufficient balance detected on Next, updating wallet...');
    const currentAmount = await getWalletAmount(partnerId);
    const topUpAmount = 10000;
    const newAmount = currentAmount + topUpAmount;
    await updateWalletAmount(partnerId, newAmount);
    console.log(`💰 Wallet updated to ${newAmount}`);

    // Retry next
    await page.waitForTimeout(3000);
    await page.getByRole('button', { name: 'Next' }).click();
  }

  // ----------- Step 4: Enter OTPs -----------
  await page.waitForTimeout(5000); // wait for OTP to generate
  const { mobileOtp,emailOtp} = await fetchLatestOtps();
  await page.getByRole('textbox', { name: 'Mobile T-Code' }).fill(mobileOtp);
  await page.getByRole('textbox', { name: 'Email T-Code' }).fill(emailOtp);

  // ----------- Step 5: Try to Purchase -----------
  await page.getByRole('button', { name: 'Purchase' }).click();

  // ----------- Step 6: Handle Insufficient or Credit Limit Popups -----------
  await page.waitForTimeout(3000); // short wait for popup to appear

  const insufficient2 = await page.locator('text=Insufficient balance').isVisible();
  const creditLimitPopup = await page.locator('text=Credit Limit Available').isVisible();

  if (insufficient2) {
    console.log('⚠️ Insufficient balance detected on Purchase, updating wallet...');
    const currentAmount = await getWalletAmount(partnerId);
    const topUpAmount = 10000;
    const newAmount = currentAmount + topUpAmount;
    await updateWalletAmount(partnerId, newAmount);
    console.log(`💰 Wallet updated to ${newAmount}`);
    await page.waitForTimeout(2000);
    await page.getByRole('button', { name: 'Purchase' }).click(); // retry purchase
  } 
  else if (creditLimitPopup) {
    console.log('💳 Credit limit popup detected — clicking OK...');
    await page.getByRole('button', { name: 'OK' }).click();
  }

  // ----------- Step 7: Verify Success -----------
  await expect(page.getByText('Purchase Successful')).toBeVisible({ timeout: 15000 });
});







// import { test, expect } from '@playwright/test';
// import pool from '../dbConfig.js'; // ✅ Import shared DB connection
// import dotenv from 'dotenv';

// dotenv.config();

// // ------------------ OTP Fetch ------------------
// async function fetchLatestOtps() {
//   const client = await pool.connect();

//   try {
//     const res = await client.query(
//       `SELECT otp 
//        FROM subscription_otp_verification 
//        ORDER BY created_at DESC 
//        LIMIT 2;`
//     );

//     if (res.rows.length < 2) {
//       throw new Error(`Expected 2 OTPs but found ${res.rows.length}`);
//     }

//     const emailOtp = res.rows[0].otp.toString().trim();
//     const mobileOtp = res.rows[1].otp.toString().trim();

//     console.log(`📩 Email OTP: ${emailOtp}, 📱 Mobile OTP: ${mobileOtp}`);
//     return { emailOtp, mobileOtp };
//   } finally {
//     client.release();
//   }
// }

// // ------------------ Wallet Helpers ------------------
// async function getWalletAmount(partnerId) {
//   const client = await pool.connect();
//   try {
//     const res = await client.query(
//       "SELECT amount FROM wallet WHERE fk_channel_partner_id = $1",
//       [partnerId]
//     );
//     return res.rows[0]?.amount || 0;
//   } finally {
//     client.release();
//   }
// }

// async function updateWalletAmount(partnerId, newAmount) {
//   const client = await pool.connect();
//   try {
//     await client.query(
//       "UPDATE wallet SET amount = $1 WHERE fk_channel_partner_id = $2",
//       [newAmount, partnerId]
//     );
//   } finally {
//     client.release();
//   }
// }

// // ------------------ Test ------------------
// test('Purchase flow with OTP and auto wallet top-up', async ({ page }) => {
//   const partnerId = '260'; // wallet fk_channel_partner_id

//   // Step 1: Login
//   await page.goto('https://hiqa1.pooraa.net/');
//   await page.getByRole('textbox', { name: 'Email ID' }).fill('ankit.kashyap@mail.busy.in');
//   await page.getByRole('textbox', { name: 'Password' }).fill('123456');
//   await page.getByRole('button', { name: 'Login' }).click();

//   // Step 2: Navigate to Partner and start purchase
//   await page.getByRole('button', { name: 'menu' }).click();
//   await page.getByRole('link', { name: 'perm_identity Partner' }).click();
//   await page.getByRole('button', { name: 'Access Account' }).nth(7).click();
//   await page.locator('div').filter({ hasText: /^Mobile$/ }).first().click();
//   await page.getByRole('textbox', { name: 'description' }).fill('1117121017');
//   await page.getByRole('button', { name: 'New', exact: true }).click();

//   // Step 3: Wait for "Purchase New" popup
// //   const purchaseNewPopup = page.getByText('Purchase New');
// //   await purchaseNewPopup.waitFor({ state: 'visible', timeout: 10000 });
// //   await purchaseNewPopup.click();

//   await page.getByRole('button', { name: 'A 360 Days' }).click();
//   await page.getByRole('button', { name: 'Next' }).click();
//   await page.getByRole('textbox', { name: 'Name' }).fill('ankit');
//   await page.getByRole('textbox').nth(3).fill('8882520239');
//   await page.getByRole('textbox', { name: 'Email' }).fill('ankit.kashyap@mail.busy.in');
//   await page.getByRole('button', { name: 'Next' }).click();

//   // Step 4: Check for "Insufficient balance"
//   //let insufficient = await page.locator('text=Insufficient balance').count();
//   let insufficient = await page.locator('text=Insufficient balance').count();
//   if (insufficient == 'Insufficient balance') {
//     console.log('⚠️ Insufficient balance detected, updating wallet...');

//     const currentAmount = await getWalletAmount(partnerId);
//     const topUpAmount = 10000; // adjust as needed
//     const newAmount = currentAmount + topUpAmount;
//     await updateWalletAmount(partnerId, newAmount);
//     console.log(`💰 Wallet updated to ${newAmount}`);
//     await page.waitForTimeout(5000); // wait for 5 seconds till next btn not enable 
//     await page.getByRole('button', { name: 'Next' }).click();
//   }
  
  
//    await page.waitForTimeout(5000); // wait for 5 seconds till otp not come
//   // Step 5: Fetch OTPs
//   const { mobileOtp, emailOtp } = await fetchLatestOtps();
//   await page.getByRole('textbox', { name: 'Mobile T-Code' }).fill(mobileOtp);
//   await page.getByRole('textbox', { name: 'Email T-Code' }).fill(emailOtp);

//   // Step 6: Purchase
//   await page.getByRole('button', { name: 'Purchase' }).click();

//   let insufficient2 = await page.locator('text=Insufficient balance').count();
//   if (insufficient2 == 'Insufficient balance') {
//     console.log('⚠️ Insufficient balance detected, updating wallet...');

//     const currentAmount = await getWalletAmount(partnerId);
//     const topUpAmount = 10000; // adjust as needed
//     const newAmount = currentAmount + topUpAmount;
//     await updateWalletAmount(partnerId, newAmount);
//     console.log(`💰 Wallet updated to ${newAmount}`);
    
//   }
//   await page.waitForTimeout(5000); // wait for 5 seconds till popup not come 
//    // Step 6: Purchase
//   await page.getByRole('button', { name: 'Purchase' }).click();

//   let creditlimit = await page.locator('text= Credit Limit Available').count();
//   if (creditlimit =='Credit Limit Available') {
//   console.log('💳 Credit limit popup detected — clicking OK...');
//   await page.getByRole('button', { name: 'OK' }).click();
// }

//   // Step 7: Verify success
//   await expect(page.getByText('Purchase Successful')).toBeVisible({ timeout: 15000 });
// });
