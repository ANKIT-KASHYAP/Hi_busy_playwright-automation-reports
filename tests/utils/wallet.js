import pool from '../dbConfig.js'

export async function updateWalletAmount(channelPartnerId) {
  try {
    const query = `
      UPDATE wallet
      SET amount = 10000
      WHERE fk_channel_partner_id = $1;
    `;

    await pool.query(query, [channelPartnerId]);

    console.log(`💰 Wallet updated to 10000 for CP ID = ${channelPartnerId}`);
  } catch (err) {
    console.error("❌ Wallet update failed:", err);
  }
}
