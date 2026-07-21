import express from 'express';
import { createOrder, getOrders } from '../controllers/orderController.js';

const router = express.Router();

// Menghubungkan endpoint API pesanan dengan fungsi di controller.
router.get('/orders', getOrders);    // GET /api/orders — mengambil riwayat pesanan
router.post('/orders', createOrder); // POST /api/orders — membuat pesanan baru

export default router;
