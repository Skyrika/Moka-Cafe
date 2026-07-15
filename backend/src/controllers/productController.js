export const getProducts = (_req, res) => {
  res.json({
    success: true,
    data: [
      { id: 1, name: 'Espresso', price: 18000 },
      { id: 2, name: 'Cappuccino', price: 25000 },
      { id: 3, name: 'Moka Latte', price: 30000 },
    ],
  });
};

export const createProduct = (req, res) => {
  const { name, price } = req.body;

  if (!name || !price) {
    return res.status(400).json({ success: false, message: 'Nama dan harga produk wajib diisi' });
  }

  res.status(201).json({
    success: true,
    message: 'Produk berhasil ditambahkan',
    data: { id: Date.now(), name, price },
  });
};
