import express from 'express';
import { register, login } from '../controllers/authController.js';
import { validateRegister } from '../validations/userValidations.js'; // importamos validaciones

const router = express.Router();

// Ruta para registrarse (POST /api/auth/register)
// router.post('/register', register); sin validator
router.post('/register', validateRegister, register); // con validator

// Ruta para loguearse (POST /api/auth/login)

router.post('/login', login);

export default router;