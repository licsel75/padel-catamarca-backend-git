import express from 'express';
import { getAllUsers, aprobarUsuario, toggleBloqueoUsuario } from '../controllers/userController.js';
import { protect } from '../middlewares/authMiddleware.js';
import { authorize } from '../middlewares/roleMiddleware.js';

const router = express.Router();

// Todas estas rutas son exclusivas para el admin
router.get('/', protect, authorize('admin'), getAllUsers);
router.put('/:id/aprobar', protect, authorize('admin'), aprobarUsuario);
router.put('/:id/bloquear', protect, authorize('admin'), toggleBloqueoUsuario);

export default router;