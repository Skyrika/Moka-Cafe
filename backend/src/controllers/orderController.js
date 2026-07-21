const sampleOrders = [
  {
    _id: "1",
    orderId: "MC-8042",
    customerName: "Ardi",
    date: new Date().toISOString(),
    time: "08:15",
    items: [
      { name: "Oat Flat White", qty: 2 },
      { name: "Almond Croissant", qty: 1 },
    ],
    status: "pending",
    total: 16500,
  },
  {
    _id: "2",
    orderId: "MC-8038",
    customerName: "Nadia",
    date: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    time: "07:30",
    items: [
      { name: "Banana Chocolate", qty: 1 },
      { name: "Cappuccino", qty: 1 },
    ],
    status: "processing",
    total: 42000,
  },
  {
    _id: "3",
    orderId: "MC-8021",
    customerName: "Lina",
    date: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    time: "12:05",
    items: [
      { name: "Matcha Latte", qty: 1 },
      { name: "Raisin Bun", qty: 2 },
    ],
    status: "ready",
    total: 63500,
  },
  {
    _id: "4",
    orderId: "MC-8007",
    customerName: "Fajar",
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(),
    time: "09:40",
    items: [
      { name: "Espresso", qty: 3 },
      { name: "Croissant", qty: 1 },
    ],
    status: "completed",
    total: 74000,
  },
  {
    _id: "5",
    orderId: "MC-7995",
    customerName: "Rizal",
    date: new Date(Date.now() - 1000 * 60 * 60 * 24 * 10).toISOString(),
    time: "11:10",
    items: [
      { name: "Latte", qty: 1 },
      { name: "Blueberry Muffin", qty: 1 },
    ],
    status: "canceled",
    total: 39000,
  },
];

export const getOrders = (_req, res) => {
  res.status(200).json(sampleOrders);
};

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
