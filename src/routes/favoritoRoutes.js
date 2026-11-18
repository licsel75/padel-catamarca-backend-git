import express from 'express';
import * as favoritoController from '../controllers/favoritoController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

// Solo los usuarios logueados pueden ver y modificar sus favoritos
router.get('/', protect, favoritoController.getMios);
router.post('/toggle/:torneoId', protect, favoritoController.toggle);

export default router;