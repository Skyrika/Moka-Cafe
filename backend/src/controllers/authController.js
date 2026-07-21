export const login = (req, res) => {
  const { username, password } = req.body;

  if (username === 'kasir' && password === '123456') {
    return res.json({
      success: true,
      message: 'Login berhasil',
      token: 'demo-token',
    });
  }

  return res.status(401).json({ success: false, message: 'Username atau password salah' });
};
