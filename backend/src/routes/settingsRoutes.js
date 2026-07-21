import express from 'express';
import { getSettings, updateSettings } from '../controllers/settingsController.js';

const router = express.Router();

router.get('/settings', getSettings);
router.put('/settings', updateSettings);

export default router;
