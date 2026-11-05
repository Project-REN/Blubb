import pg from 'pg';
import dotenv from 'dotenv';

dotenv.config();
const { Pool } = pg;

export const pool = new Pool({
  host: process.env.PGHOST || 'localhost',
  port: parseInt(process.env.PGPORT || '5432', 10),
  database: process.env.PGDATABASE || 'projectNebula',
  user: process.env.PGUSER || 'postgres',
  password: process.env.PGPASSWORD || 'postgres',
  max: 20,
});

pool.on('connect', () => {
  console.log(' Connected to PostgreSQL database successfully');
});

pool.on('error', (err) => {
  console.error('[Postgres] Idle client error:', err.message);
});