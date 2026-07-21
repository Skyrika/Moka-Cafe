import { query } from '../config/database.js';

export const login = async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ success: false, message: 'Username dan password diperlukan' });
  }

  try {
    const result = await query('SELECT id, username, password, role FROM users WHERE username = $1', [username]);

    if (result.rowCount === 0) {
      return res.status(401).json({ success: false, message: 'Username atau password salah' });
    }

    const user = result.rows[0];

    if (password !== user.password) {
      return res.status(401).json({ success: false, message: 'Username atau password salah' });
    }

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
