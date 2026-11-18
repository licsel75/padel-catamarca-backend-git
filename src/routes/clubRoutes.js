import express from 'express';
import * as clubController from '../controllers/clubController.js';
import { protect } from '../middlewares/authMiddleware.js';
import { authorize } from '../middlewares/roleMiddleware.js';

const router = express.Router();

// Rutas públicas (Cualquiera puede ver los clubes)
router.get('/', clubController.getAll);
router.get('/:id', clubController.getOne);

// Rutas protegidas (Solo organizadores y admins)
router.post('/', protect, authorize('organizador', 'admin'), clubController.create);
router.put('/:id', protect, authorize('organizador', 'admin'), clubController.update);
router.delete('/:id', protect, authorize('organizador', 'admin'), clubController.remove);

export default router;