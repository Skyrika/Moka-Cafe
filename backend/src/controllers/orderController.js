export const createOrder = (req, res) => {
  const { items, totalAmount, paidAmount } = req.body;

  if (!items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ success: false, message: 'Daftar pesanan wajib ada' });
  }

  const change = Math.max(0, paidAmount - totalAmount);

  res.status(201).json({
    success: true,
    message: 'Pesanan berhasil dibuat',
    data: {
      orderId: `ORD-${Date.now()}`,
      items,
      totalAmount,
      paidAmount,
      change,
    },
  });
};
