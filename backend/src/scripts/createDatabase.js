import dotenv from 'dotenv';
import pkg from 'pg';
import { fileURLToPath } from 'url';
import path from 'path';
import { initDatabase } from '../config/initDatabase.js';

dotenv.config();

const { Client } = pkg;

const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_PORT = Number(process.env.DB_PORT || 5432);
const DB_USER = process.env.DB_USER || 'postgres';
const DB_PASSWORD = process.env.DB_PASSWORD || '123';
const DB_NAME = process.env.DB_NAME || 'moka_cafe';

const main = async () => {
  // Connect to default 'postgres' database to create target database if missing
  const client = new Client({
    host: DB_HOST,
    port: DB_PORT,
    user: DB_USER,
    password: DB_PASSWORD,
    database: 'postgres',
  });

  try {
    await client.connect();

    const res = await client.query('SELECT 1 FROM pg_database WHERE datname = $1', [DB_NAME]);
    if (res.rowCount === 0) {
      console.log(`Database "${DB_NAME}" tidak ditemukan. Membuat database...`);
      // CREATE DATABASE cannot run inside a transaction block
      await client.query(`CREATE DATABASE "${DB_NAME}"`);
      console.log(`Database "${DB_NAME}" berhasil dibuat.`);
    } else {
      console.log(`Database "${DB_NAME}" sudah ada.`);
    }

    await client.end();

    // Run schema + seed
    console.log('Menjalankan skema dan seed (init.sql)...');
    await initDatabase();
    console.log('Inisialisasi database selesai.');
  } catch (err) {
    console.error('Gagal membuat atau menginisialisasi database:', err.message);
    try {
      await client.end();
    } catch (e) {
      // ignore
    }
    process.exit(1);
  }
};

if (process.argv[1] && fileURLToPath(import.meta.url).endsWith(process.argv[1].replace(/\\/g, '/'))) {
  main();
}

export default main;
