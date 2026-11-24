import express from 'express';
import {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  aprobarUsuario,
  toggleBloqueoUsuario
} from '../controllers/userController.js';
import { protect } from '../middlewares/authMiddleware.js';
import { authorize } from '../middlewares/roleMiddleware.js';

const router = express.Router();

// Todas estas rutas están doblemente protegidas: requieren JWT válido y rol 'admin'
router.post('/', protect, authorize('admin'), createUser);
router.get('/', protect, authorize('admin'), getAllUsers);
router.get('/:id', protect, authorize('admin'), getUserById);
router.put('/:id', protect, authorize('admin'), updateUser);
router.put('/:id/aprobar', protect, authorize('admin'), aprobarUsuario);
router.put('/:id/bloquear', protect, authorize('admin'), toggleBloqueoUsuario);

export default router;