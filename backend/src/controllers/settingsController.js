import { query } from '../config/database.js';

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

export const getSettings = async (_req, res) => {
  try {
    const result = await query('SELECT key, value FROM settings');
    const settings = parseSettings(result.rows);

    res.json({ success: true, data: settings });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const updateSettings = async (req, res) => {
  const { taxRate, taxInclusive } = req.body;

  if (taxRate === undefined || taxInclusive === undefined) {
    return res.status(400).json({ success: false, message: 'taxRate dan taxInclusive wajib diisi' });
  }

  try {
    await query(
      `INSERT INTO settings (key, value)
       VALUES ($1, $2), ($3, $4)
       ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = CURRENT_TIMESTAMP`,
      ['tax_rate', String(taxRate), 'tax_inclusive', taxInclusive ? 'true' : 'false']
    );

    res.json({ success: true, message: 'Pengaturan pajak berhasil diperbarui', data: { taxRate, taxInclusive } });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
