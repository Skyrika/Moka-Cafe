import express from 'express';
import { getProducts, createProduct, updateProduct, deleteProduct } from '../controllers/productController.js';

const router = express.Router();

// Menghubungkan endpoint API produk dengan fungsi di controller.
router.get('/products', getProducts);       // GET /api/products — mengambil semua produk
router.post('/products', createProduct);     // POST /api/products — menambah produk baru
router.put('/products/:id', updateProduct);  // PUT /api/products/:id — memperbarui produk
router.delete('/products/:id', deleteProduct); // DELETE /api/products/:id — menghapus produk

export default router;
