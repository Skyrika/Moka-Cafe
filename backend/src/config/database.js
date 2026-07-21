import dotenv from 'dotenv';
import pkg from 'pg';

dotenv.config();

const { Pool } = pkg;

const pool = new Pool({
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT || 5432),
  database: process.env.DB_NAME || 'moka_cafe',
  user: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || '123',
  ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
});

export const connectDB = async () => {
  const client = await pool.connect();
  try {
    await client.query('SELECT NOW()');
    console.log('Koneksi PostgreSQL berhasil.');
  } finally {
    client.release();
  }
};

export const query = (text, params) => pool.query(text, params);
export const closeDB = () => pool.end();
