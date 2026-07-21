export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || authHeader !== 'Bearer demo-token') {
    return res.status(401).json({ success: false, message: 'Token tidak valid' });
  }

  next();
};
