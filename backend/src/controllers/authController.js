import { query } from '../config/database.js';

// Memproses login pengguna dengan memvalidasi username dan password dari database.
export const login = async (req, res) => {
  // Mengambil username dan password dari body request.
  const { username, password } = req.body;

  // Memvalidasi bahwa username dan password dikirim.
  if (!username || !password) {
    return res.status(400).json({ success: false, message: 'Username dan password diperlukan' });
  }

  try {
    // Mencari pengguna di database berdasarkan username.
    const result = await query('SELECT id, username, password, role FROM users WHERE username = $1', [username]);

    // Jika pengguna tidak ditemukan, kirim response gagal.
    if (result.rowCount === 0) {
      return res.status(401).json({ success: false, message: 'Username atau password salah' });
    }

    const user = result.rows[0];

    // Memverifikasi password (menggunakan perbandingan langsung untuk demo).
    if (password !== user.password) {
      return res.status(401).json({ success: false, message: 'Username atau password salah' });
    }

    // Mengirim response sukses dengan token dan data pengguna ke frontend.
    return res.json({
      success: true,
      message: 'Login berhasil',
      token: 'demo-token',
      user: {
        id: user.id,
        username: user.username,
        role: user.role,
      },
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
