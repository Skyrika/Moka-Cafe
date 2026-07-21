import { query } from '../config/database.js';

// Mengambil seluruh data produk dari database dan mengirimkannya ke frontend.
export const getProducts = async (_req, res) => {
  try {
    // Query SELECT untuk mengambil semua produk, diurutkan berdasarkan ID.
    const result = await query(
      'SELECT id, name, category, price, stock, image_url FROM products ORDER BY id ASC'
    );

    // Mengirim response berisi daftar produk ke frontend.
    res.json({ success: true, data: result.rows });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Menambahkan produk baru ke database setelah validasi data.
export const createProduct = async (req, res) => {
  // Mengambil data produk dari body request.
  const { name, category = 'Umum', price, stock = 0, image_url = null } = req.body;

  // Memvalidasi bahwa nama dan harga wajib diisi.
  if (!name || price === undefined) {
    return res.status(400).json({ success: false, message: 'Nama dan harga produk wajib diisi' });
  }

  // Memastikan stok tidak negatif.
  if (stock < 0) {
    return res.status(400).json({ success: false, message: 'Stok tidak boleh bernilai negatif' });
  }

  try {
    // Query INSERT untuk menyimpan produk baru ke database.
    const result = await query(
      'INSERT INTO products (name, category, price, stock, image_url) VALUES ($1, $2, $3, $4, $5) RETURNING id, name, category, price, stock, image_url',
      [name, category, price, stock, image_url]
    );

    // Mengirim response sukses dengan data produk yang baru dibuat.
    res.status(201).json({
      success: true,
      message: 'Produk berhasil ditambahkan',
      data: result.rows[0],
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Memperbarui data produk yang sudah ada di database berdasarkan ID.
export const updateProduct = async (req, res) => {
  // Mengambil ID produk dari parameter URL.
  const { id } = req.params;
  const { name, category, price, stock, image_url } = req.body;

  // Memastikan stok tidak negatif jika dikirim.
  if (stock !== undefined && stock < 0) {
    return res.status(400).json({ success: false, message: 'Stok tidak boleh bernilai negatif' });
  }

  try {
    // Query UPDATE dengan COALESCE untuk hanya memperbarui field yang dikirim.
    const result = await query(
      'UPDATE products SET name = COALESCE($1, name), category = COALESCE($2, category), price = COALESCE($3, price), stock = COALESCE($4, stock), image_url = COALESCE($5, image_url) WHERE id = $6 RETURNING id, name, category, price, stock, image_url',
      [name, category, price, stock, image_url, id]
    );

    // Jika tidak ada produk dengan ID tersebut, kirim notifikasi 404.
    if (result.rowCount === 0) {
      return res.status(404).json({ success: false, message: 'Produk tidak ditemukan' });
    }

    // Mengirim data produk yang telah diperbarui ke frontend.
    res.json({ success: true, message: 'Produk berhasil diperbarui', data: result.rows[0] });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Menghapus produk dari database berdasarkan ID.
export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    // Query DELETE untuk menghapus produk berdasarkan ID.
    const result = await query('DELETE FROM products WHERE id = $1 RETURNING id', [id]);

    if (result.rowCount === 0) {
      return res.status(404).json({ success: false, message: 'Produk tidak ditemukan' });
    }

    // Mengirim konfirmasi penghapusan ke frontend.
    res.json({ success: true, message: 'Produk berhasil dihapus' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
