// Mengimpor fungsi query standar dan getClient untuk transaksi database.
import { query, getClient } from '../config/database.js';

// Membuat pesanan baru: memvalidasi stok, menyimpan pesanan, dan mengurangi stok dalam satu transaksi.
export const createOrder = async (req, res) => {
  // Mengambil data pesanan dari body request (items, totalAmount, paidAmount).
  const { items, totalAmount, paidAmount } = req.body;

  // Memvalidasi bahwa daftar items ada dan tidak kosong.
  if (!items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({
      success: false,
      message: 'Daftar pesanan wajib ada',
    });
  }

  // Validasi setiap item memiliki quantity lebih dari 0.
  for (const item of items) {
    if (!item.id || !item.quantity || item.quantity <= 0) {
      return res.status(400).json({
        success: false,
        message: 'Quantity setiap item harus lebih dari 0',
      });
    }
  }

  // Memastikan pembayaran mencukupi total belanja.
  if (!paidAmount || paidAmount < totalAmount) {
    return res.status(400).json({
      success: false,
      message: 'Jumlah pembayaran tidak mencukupi',
    });
  }

  // Menghitung uang kembalian.
  const change = Math.max(0, paidAmount - totalAmount);
  const client = await getClient();

  try {
    // Memulai transaksi database (BEGIN).
    await client.query('BEGIN');

    // Validasi stok untuk setiap item dengan FOR UPDATE (mencegah race condition).
    for (const item of items) {
      const productResult = await client.query(
        'SELECT id, name, stock FROM products WHERE id = $1 FOR UPDATE',
        [item.id]
      );

      // Memeriksa apakah produk ditemukan.
      if (productResult.rows.length === 0) {
        throw new Error(`Produk dengan ID ${item.id} tidak ditemukan`);
      }

      const product = productResult.rows[0];
      // Memeriksa apakah stok mencukupi.
      if (product.stock < item.quantity) {
        throw new Error(
          `Stok produk tidak mencukupi untuk ${product.name}. Stok tersedia: ${product.stock}, diminta: ${item.quantity}`
        );
      }
    }

    // Menyimpan data pesanan ke tabel orders.
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

    // Mengurangi stok untuk setiap item yang dibeli.
    for (const item of items) {
      const updateResult = await client.query(
        'UPDATE products SET stock = stock - $1 WHERE id = $2 AND stock >= $1',
        [item.quantity, item.id]
      );

      if (updateResult.rowCount === 0) {
        throw new Error(`Gagal memperbarui stok untuk produk ID ${item.id}`);
      }
    }

    // Menyelesaikan transaksi (COMMIT).
    await client.query('COMMIT');

    // Mengirim response sukses dengan data pesanan ke frontend.
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
    // ROLLBACK transaksi jika terjadi error.
    try {
      await client.query('ROLLBACK');
    } catch (rollbackError) {
      console.error('Gagal rollback:', rollbackError.message);
    }

    // Mengirim pesan error spesifik untuk masalah stok.
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
    // Mengembalikan koneksi client ke pool.
    client.release();
  }
};

// Mengambil seluruh riwayat pesanan dari database.
export const getOrders = async (_req, res) => {
  try {
    // Query SELECT untuk mengambil semua pesanan, diurutkan dari terbaru.
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

    // Memformat data pesanan dan mengirimkannya ke frontend.
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
