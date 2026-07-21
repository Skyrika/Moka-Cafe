import { query } from '../config/database.js';

export const createOrder = async (req, res) => {
  const { items, totalAmount, paidAmount } = req.body;

  if (!items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({
      success: false,
      message: 'Daftar pesanan wajib ada',
    });
  }

  const change = Math.max(0, paidAmount - totalAmount);

  try {
    const result = await query(
      `INSERT INTO orders
      (items, total_amount, paid_amount, change_amount)
      VALUES ($1, $2, $3, $4)
      RETURNING id, items, total_amount, paid_amount, change_amount, created_at`,
      [
        JSON.stringify(items),
        totalAmount,
        paidAmount,
        change,
      ]
    );

    res.status(201).json({
      success: true,
      message: 'Pesanan berhasil dibuat',
      data: {
        orderId: `ORD-${result.rows[0].id}`,
        items: result.rows[0].items,
        totalAmount: result.rows[0].total_amount,
        paidAmount: result.rows[0].paid_amount,
        change: result.rows[0].change_amount,
        createdAt: result.rows[0].created_at,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getOrders = async (_req, res) => {
  try {
    const result = await query(
      `SELECT
        id,
        items,
        total_amount,
        paid_amount,
        change_amount,
        created_at
      FROM orders
      ORDER BY created_at DESC`
    );

    res.json({
      success: true,
      data: result.rows.map((row) => ({
        orderId: `ORD-${row.id}`,
        items: row.items,
        totalAmount: row.total_amount,
        paidAmount: row.paid_amount,
        changeAmount: row.change_amount,
        createdAt: row.created_at,
      })),
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};