import express from 'express';
import * as torneoController from '../controllers/torneoController.js';
import { protect } from '../middlewares/authMiddleware.js';
import { authorize } from '../middlewares/roleMiddleware.js';
import { validateTorneo } from '../validations/torneoValidations.js';

// Creo una instancia aislada del enrutador de Express para modularizar los endpoints de torneos
const router = express.Router();

// ==========================================
// RUTAS PÚBLICAS (Lectura abierta)
// ==========================================
// No llevan middlewares de autenticación porque cualquier visitante puede consultar la cartelera y el detalle de un torneo
router.get('/', torneoController.getAll);
router.get('/:id', torneoController.getOne);

// ==========================================
// RUTAS PROTEGIDAS (Escritura con pipeline de seguridad)
// ==========================================
// Encadeno los middlewares en un orden estricto (Fail-Fast) antes de llegar al controlador:
// 1. 'protect': Verifico que venga un token JWT válido y adjunto los datos del usuario en req.user.
// 2. 'authorize(...)': Verifico que el rol del usuario tenga permisos para gestionar torneos (RBAC).
// 3. 'validateTorneo': Valido el cuerpo de la petición (req.body) antes de tocar la base de datos.

router.post(
  '/',
  protect,
  authorize('organizador', 'dueño_club', 'admin'),
  validateTorneo,



  torneoController.create
);




router.put(
  '/:id',
  protect,//   controlo si el token es válido?
  authorize('organizador', 'dueño_club', 'admin'),// controlo si el rol está aprobado
  validateTorneo,//  controlo si los datos tienen sentido


  
  torneoController.update // Si pasó todo, creá el torneo
);

// En DELETE no necesito validateTorneo porque no recibo un body; solo autentico, autorizo y delego al controlador
router.delete(
  '/:id',
  protect,
  authorize('organizador', 'dueño_club', 'admin'),
  torneoController.remove
);

export default router;