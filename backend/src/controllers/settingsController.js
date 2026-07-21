import { query } from '../config/database.js';

// Mengubah hasil query settings (array key-value) menjadi object dengan properti taxRate dan taxInclusive.
const parseSettings = (rows) => {
  const map = rows.reduce((acc, row) => ({
    ...acc,
    [row.key]: row.value,
  }), {});

  return {
    taxRate: Number(map.tax_rate || 11),
    taxInclusive: map.tax_inclusive === 'true',
  };
};

// Mengambil konfigurasi pengaturan (pajak) dari database dan mengirimkannya ke frontend.
export const getSettings = async (_req, res) => {
  try {
    // Query SELECT untuk mengambil semua key-value settings.
    const result = await query('SELECT key, value FROM settings');
    const settings = parseSettings(result.rows);

    res.json({ success: true, data: settings });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Memperbarui pengaturan pajak (taxRate dan taxInclusive) di database.
export const updateSettings = async (req, res) => {
  const { taxRate, taxInclusive } = req.body;

  // Memvalidasi bahwa data yang diperlukan ada dalam request.
  if (taxRate === undefined || taxInclusive === undefined) {
    return res.status(400).json({ success: false, message: 'taxRate dan taxInclusive wajib diisi' });
  }

  try {
    // Query UPSERT: menyisipkan atau memperbarui pengaturan pajak.
    await query(
      `INSERT INTO settings (key, value)
       VALUES ($1, $2), ($3, $4)
       ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = CURRENT_TIMESTAMP`,
      ['tax_rate', String(taxRate), 'tax_inclusive', taxInclusive ? 'true' : 'false']
    );

    // Mengirim konfirmasi pembaruan ke frontend.
    res.json({ success: true, message: 'Pengaturan pajak berhasil diperbarui', data: { taxRate, taxInclusive } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
