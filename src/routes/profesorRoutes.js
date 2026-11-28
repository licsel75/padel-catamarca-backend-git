import { Router } from 'express';
import * as profesorController from '../controllers/profesorController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = Router();

// Ruta pública: cualquier visitante puede ver el directorio de profesores
router.get('/', profesorController.getAll);

// Rutas protegidas: verifico que el usuario esté autenticado con JWT;
// la validación de rol y aprobación se resuelve dentro de profesorService
router.get('/mi-perfil', protect, profesorController.getMiPerfil);
router.post('/mi-perfil', protect, profesorController.guardarPerfil);
router.delete('/:id', protect, profesorController.remove);

// Ruta exclusiva de Admin: marcar o desmarcar un perfil como destacado
router.put('/:id/destacar', protect, profesorController.toggleDestacado);

export default router;