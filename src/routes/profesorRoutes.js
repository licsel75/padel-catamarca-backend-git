import { Router } from 'express';
import * as profesorController from '../controllers/profesorController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = Router();

// Ruta pública: cualquier visitante puede ver el directorio de profesores
router.get('/', profesorController.getAll);

// Rutas protegidas: verifico que el usuario esté autenticado con JWT;
// la validación de rol y aprobación se resuelve dentro de profesorService
router.get('/mi-perfil', protect, profesorController.getMine);
router.post('/mi-perfil', protect, profesorController.upsertMine);
router.delete('/:id', protect, profesorController.remove);

export default router;