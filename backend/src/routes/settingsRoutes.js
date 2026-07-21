import express from 'express';
import { getSettings, updateSettings } from '../controllers/settingsController.js';

const router = express.Router();

// Menghubungkan endpoint API pengaturan dengan fungsi di controller.
router.get('/settings', getSettings);    // GET /api/settings — mengambil pengaturan
router.put('/settings', updateSettings); // PUT /api/settings — memperbarui pengaturan

export default router;
