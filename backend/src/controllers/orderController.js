import { query, getClient } from '../config/database.js';

export const createOrder = async (req, res) => {
  const { items, totalAmount, paidAmount } = req.body;

  if (!items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({
      success: false,
      message: 'Daftar pesanan wajib ada',
    });
  }

  const change = Math.max(0, paidAmount - totalAmount);
  const client = await getClient();

  try {
    // BEGIN transaction
    await client.query('BEGIN');

    // Validasi stok untuk setiap item dengan FOR UPDATE (cegah race condition)
    for (const item of items) {
      const productResult = await client.query(
        'SELECT id, name, stock FROM products WHERE id = $1 FOR UPDATE',
        [item.id]
      );

      if (productResult.rows.length === 0) {
        throw new Error(`Produk dengan ID ${item.id} tidak ditemukan`);
      }

      const product = productResult.rows[0];
      if (product.stock < item.quantity) {
        throw new Error(
          `Stok produk tidak mencukupi untuk ${product.name}. Stok tersedia: ${product.stock}, diminta: ${item.quantity}`
        );
      }
    }

    // Insert order
    const orderResult = await client.query(
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

    // Kurangi stok untuk setiap item
    for (const item of items) {
      const updateResult = await client.query(
        'UPDATE products SET stock = stock - $1 WHERE id = $2 AND stock >= $1',
        [item.quantity, item.id]
      );

      if (updateResult.rowCount === 0) {
        throw new Error(`Gagal memperbarui stok untuk produk ID ${item.id}`);
      }
    }

    // COMMIT transaction
    await client.query('COMMIT');

    res.status(201).json({
      success: true,
      message: 'Pesanan berhasil dibuat',
      data: {
        orderId: `ORD-${orderResult.rows[0].id}`,
        items: orderResult.rows[0].items,
        totalAmount: orderResult.rows[0].total_amount,
        paidAmount: orderResult.rows[0].paid_amount,
        change: orderResult.rows[0].change_amount,
        createdAt: orderResult.rows[0].created_at,
      },
    });
  } catch (error) {
    // ROLLBACK transaction jika ada error
    try {
      await client.query('ROLLBACK');
    } catch (rollbackError) {
      console.error('Gagal rollback:', rollbackError.message);
    }

    // Cek apakah error terkait stok
    if (error.message.includes('Stok produk tidak mencukupi')) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    res.status(500).json({
      success: false,
      message: error.message,
    });
  } finally {
    client.release();
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