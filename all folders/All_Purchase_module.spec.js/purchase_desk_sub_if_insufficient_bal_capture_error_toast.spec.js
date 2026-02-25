import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';
import pool from '../../dbConfig.js'
import { installSubscription } from '../subscriptionInstall.spec.js';

dotenv.config();
//===============================================>>>>>>>>>>>>>>>>
//step1. hit purchase ->insufficent balance error-->update wallet with (cp_id=260) 100000 ac
//then refresh page -->fill count-->hit on puchase -->see purchase msg


//combiled code:
//first purchase(purchase_desk_sub) ->install
//========================================================>>>>>>>>>>>
// -------------------------
// DB CONNECTION
// -------------------------
// const pool = new pg.Pool({
//   connectionString: process.env.DATABASE_URL,
//   ssl: false,
// });

// -------------------------
// FUNCTION TO UPDATE WALLET
// -------------------------
async function updateWalletAmount(channelPartnerId) {
  try {
    const query = `
      UPDATE wallet
      SET amount = 100000
      WHERE fk_channel_partner_id = $1;
    `;

    await pool.query(query, [channelPartnerId]);

    console.log(`💰 Wallet updated to 10000 for CP ID = ${channelPartnerId}`);
  } catch (err) {
    console.error("❌ Wallet update failed:", err);
  }
}

// -------------------------
// MAIN TEST
// -------------------------

async function attemptPurchase(page) {
  await page.getByRole('button', { name: 'Perpetual' }).click();

  await page.getByRole('textbox').nth(1).click();
  await page.getByRole('textbox').nth(1).fill('01');

  await page.getByRole('button', { name: 'Purchase' })
    .scrollIntoViewIfNeeded();

  await page.getByRole('button', { name: 'Purchase' }).click();
}

test('auto top-up on insufficient balance and retry purchase', async ({ page }) => {

  await page.goto('https://hiqa2.pooraa.net/');

  await page.getByRole('textbox', { name: 'Email ID' })
    .fill('ankit.kashyap@mail.busy.in');
    
  await page.getByRole('textbox', { name: 'Password' })
    .fill('123456');

  await page.getByRole('button', { name: 'Login' }).click();
  await page.getByRole('button', { name: 'menu' }).click();

  //---------------
  await page.getByRole('link', { name: 'perm_identity Partner' }).click();
  await page.locator('div:nth-child(3) > div:nth-child(4) > .MuiPaper-root > div > .MuiGrid-root.MuiGrid-item.MuiGrid-grid-xs-11 > .MuiGrid-root.MuiGrid-container > .MuiButtonBase-root').click();
 //------------------------------------------------------
  await page.getByRole('button', { name: 'Perpetual' }).click();
  await page.getByRole('textbox').nth(1).click();
  await page.getByRole('textbox').nth(1).fill('01');
  await page.getByRole('button', { name: 'Purchase' })
   .scrollIntoViewIfNeeded();

  await page.getByRole('button', { name: 'Purchase' }).click();
//--------------------------------------------------------

  // Check insufficient balance
  const toast = page.getByText('Insufficient balance');

  let insufficient = false;

  try {
    await expect(toast).toBeVisible({ timeout: 5000 });
    console.log("⚠️ Insufficient balance detected");
    insufficient = true;

  } catch {
    console.log("👌 CP has sufficient balance — proceeding normally");
  }

  // If insufficient → Update DB → Retry
  if (insufficient) {

    await updateWalletAmount(260);

    console.log("💰 Balance updated → Retrying purchase...");

     await page.waitForTimeout(5000);
 await page.reload({ waitUntil: 'networkidle' });
    console.log("🔄 Page refreshed");

    // Wait for page + API to stabilize
    await page.waitForTimeout(2000);
     
  await page.getByRole('textbox').nth(1).click();
  await page.getByRole('textbox').nth(1).fill('01');
  await page.waitForTimeout(2000);
  await page.getByRole('button', { name: 'Purchase' })
   .scrollIntoViewIfNeeded();

  await page.getByRole('button', { name: 'Purchase' }).click();

  const successToast = page.getByText('Purchase Successful');

// ⭐ SUBSCRIPTION ID PICK KARO
const subIdLocator = page.locator("//div[@class='MuiBox-root jss809']");

// Wait for subscription ID to appear
await subIdLocator.waitFor({ timeout: 8000 });

// Read subscription number
const subNumb = await subIdLocator.innerText();
console.log("📌 SUBSCRIPTION NumBER is =>>:", subNumb);

try {
  await expect(successToast).toBeVisible({ timeout: 7000 });
  console.log("🎉 Purchase Successful toast visible!");
} catch {
  console.log("❌ Purchase successful toast NOT visible!");
}


  }
  
    // ⭐⭐⭐ YAHAN INSTALLATION API KO CALL KARO ⭐⭐⭐
 //await installSubscription(request, subNumber);

});
