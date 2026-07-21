// Mengimpor modul untuk membaca file dan path.
import fs from 'fs/promises';
import { fileURLToPath } from 'url';
import path from 'path';
import { query } from './database.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const initSqlPath = path.resolve(__dirname, '../../sql/init.sql');

// Membaca dan mengeksekusi file init.sql untuk membuat skema dan data awal.
export const initDatabase = async () => {
  try {
    const sql = await fs.readFile(initSqlPath, 'utf8');
    await query(sql);
    console.log('Database schema dan seed dijalankan.');
  } catch (error) {
    console.error('Gagal inisialisasi database:', error.message);
    throw error;
  }
};
