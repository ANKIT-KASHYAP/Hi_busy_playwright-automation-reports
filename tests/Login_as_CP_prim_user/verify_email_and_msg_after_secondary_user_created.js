//select nq.params ->> 'company_name' as Created_by_Primary_user, * from notification_queue nq where nq.fk_busy_notification_trigger_id = 2 and nq."content" like('%Hi Busy account has been created%') order by created_at desc;

import { test, expect } from '@playwright/test';
import pool from '../../dbConfig.js'; // ✅ Import shared DB connection
import dotenv from 'dotenv';


test.use({
  launchOptions:{
    slowMo:400,
  },
})

dotenv.config();


async function verifySmsOrEmailAfterSecondaryUserCreated() {
  const client = await pool.connect();

  try {
    const res = await client.query(
      ` SELECT DISTINCT ON (nq.fk_busy_notification_trigger_id)
        nq.fk_busy_notification_trigger_id,
        nq.params ->> 'company_name' AS created_by_primary_user,
        nq.status,
        nq.content,
        nq.created_at
      FROM notification_queue nq
      WHERE nq.fk_busy_notification_trigger_id IN (1, 2)
        AND nq.content LIKE '%Hi Busy account has been created%'
      ORDER BY nq.fk_busy_notification_trigger_id, nq.created_at DESC;
    `);

    if (res.rows.length === 0) {
      return {
        success: false,
        message: 'sorry'
      };
    }

    // ✅ SUCCESS / PROCESSED wali notification dhundo
    const successNotification = res.rows.find(
      row => row.status === 'SUCCESS' || row.status === 'PROCESSED'
    );

    if (successNotification) {
      return {
        success: true,
        channel:
          successNotification.fk_busy_notification_trigger_id === 2
            ? 'SMS'
            : 'EMAIL',
        message: `${successNotification.channel || 'Notification'} sent successfully`,
        createdBy: successNotification.created_by_primary_user
      };
    }

    // ❌ dono fail
    return {
      success: false,
      message: 'sorry'
    };

  } finally {
    client.release();
  }
}

export default verifySmsOrEmailAfterSecondaryUserCreated;

// SELECT DISTINCT ON (nq.fk_busy_notification_trigger_id)
      //   nq.fk_busy_notification_trigger_id,
      //   nq.params ->> 'company_name' AS created_by_primary_user,
      //   nq.status,
      //   nq.content,
      //   nq.created_at
      // FROM notification_queue nq
      // WHERE nq.fk_busy_notification_trigger_id IN (1, 2)
      //   AND nq.content LIKE '%Hi Busy account has been created%'
      // ORDER BY nq.fk_busy_notification_trigger_id, nq.created_at DESC;