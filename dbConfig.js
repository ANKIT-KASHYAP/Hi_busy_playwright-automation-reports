import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();

console.log('🔗 Loaded DATABASE_URL:', process.env.DATABASE_URL);

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: false,
});

pool.on('connect', () => {
  console.log('✅ Connected to PostgreSQL successfully');
});

pool.on('error', (err) => {
  console.error('❌ PostgreSQL Pool Error:', err);
});


export default pool;





