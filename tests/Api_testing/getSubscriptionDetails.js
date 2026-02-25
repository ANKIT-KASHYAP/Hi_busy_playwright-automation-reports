import pool from '../../dbConfig.js'

export async function getSubscriptionDetails(subscription_number) {
  try {
    const query = `
      select ds.subscription_number ,ds.activation_key , cp.dealer_id 
    from  desktop_subscription ds
   join channel_partner cp on
	cp.channel_partner_id = ds.fk_billed_partner
	where ds.subscription_number =$1
    order by
	ds.desktop_subscription_id desc;
    `;

    const result = await pool.query(query, [subscription_number]);

    return result.rows[0];   // ek row return karega
  } catch (err) {
    console.error("❌ DB Error:", err);
    throw err;
  }
}
