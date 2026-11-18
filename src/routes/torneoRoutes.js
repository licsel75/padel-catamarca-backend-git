import express from 'express';
import * as torneoController from '../controllers/torneoController.js';
import { protect } from '../middlewares/authMiddleware.js';
import { authorize } from '../middlewares/roleMiddleware.js';

const router = express.Router();

// Rutas públicas (Cualquiera puede ver los torneos)
router.get('/', torneoController.getAll);
router.get('/:id', torneoController.getOne);

// Rutas protegidas (Solo organizadores, dueños de club y admins aprobados)
router.post('/', protect, authorize('organizador', 'dueño_club', 'admin'), torneoController.create);
router.put('/:id', protect, authorize('organizador', 'dueño_club', 'admin'), torneoController.update);
router.delete('/:id', protect, authorize('organizador', 'dueño_club', 'admin'), torneoController.remove);

export default router;