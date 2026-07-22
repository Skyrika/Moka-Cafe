import { query } from "../config/database.js";

const getImagePath = (req) => {
  if (!req.file) return null;
  return `/uploads/${req.file.filename}`;
};

// Mengambil seluruh data produk dari database dan mengirimkannya ke frontend.
export const getProducts = async (_req, res) => {
  try {
    const result = await query(
      "SELECT id, name, category, price, stock, image_url FROM products ORDER BY id ASC"
    );

    res.json({
      success: true,
      data: result.rows,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Menambahkan produk baru ke database.
export const createProduct = async (req, res) => {
  const { name, category = "Umum", price, stock = 0 } = req.body;

  const image_url = getImagePath(req);

  if (!name || price === undefined) {
    return res.status(400).json({
      success: false,
      message: "Nama dan harga produk wajib diisi",
    });
  }

  if (stock < 0) {
    return res.status(400).json({
      success: false,
      message: "Stok tidak boleh bernilai negatif",
    });
  }

  try {
    const result = await query(
      `INSERT INTO products
      (name, category, price, stock, image_url)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING id, name, category, price, stock, image_url`,
      [name, category, price, stock, image_url]
    );

    res.status(201).json({
      success: true,
      message: "Produk berhasil ditambahkan",
      data: result.rows[0],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Memperbarui data produk.
export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, category, price, stock } = req.body;

  const image_url = getImagePath(req);

  if (stock !== undefined && stock < 0) {
    return res.status(400).json({
      success: false,
      message: "Stok tidak boleh bernilai negatif",
    });
  }

  try {
    const result = await query(
      `UPDATE products
      SET
        name = COALESCE($1, name),
        category = COALESCE($2, category),
        price = COALESCE($3, price),
        stock = COALESCE($4, stock),
        image_url = COALESCE($5, image_url)
      WHERE id = $6
      RETURNING id, name, category, price, stock, image_url`,
      [name, category, price, stock, image_url, id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({
        success: false,
        message: "Produk tidak ditemukan",
      });
    }

    res.json({
      success: true,
      message: "Produk berhasil diperbarui",
      data: result.rows[0],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Menghapus produk.
export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await query(
      "DELETE FROM products WHERE id = $1 RETURNING id",
      [id]
    );

    if (result.rowCount === 0) {
      return res.status(404).json({
        success: false,
        message: "Produk tidak ditemukan",
      });
    }

    res.json({
      success: true,
      message: "Produk berhasil dihapus",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};