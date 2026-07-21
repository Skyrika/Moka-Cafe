import express from 'express';
import { login } from '../controllers/authController.js';

const router = express.Router();

// Menghubungkan endpoint login dengan fungsi di controller.
router.post('/login', login); // POST /api/login — login pengguna

export default router;
