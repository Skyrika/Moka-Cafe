// Middleware untuk memvalidasi token autentikasi sebelum mengakses route tertentu.
export const authMiddleware = (req, res, next) => {
  // Mengambil token dari header Authorization.
  const authHeader = req.headers.authorization;

  // Memeriksa apakah token sesuai dengan token demo yang diharapkan.
  if (!authHeader || authHeader !== 'Bearer demo-token') {
    return res.status(401).json({ success: false, message: 'Token tidak valid' });
  }

  // Melanjutkan ke handler berikutnya jika token valid.
  next();
};
