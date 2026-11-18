import express from 'express';
import { aprobarUsuario } from '../controllers/userController.js';
import { protect } from '../middlewares/authMiddleware.js';
import { authorize } from '../middlewares/roleMiddleware.js';

const router = express.Router();

// Solo el admin puede aprobar
router.put('/:id/aprobar', protect, authorize('admin'), aprobarUsuario);

export default router;