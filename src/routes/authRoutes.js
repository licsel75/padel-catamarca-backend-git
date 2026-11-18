import express from 'express';
import { register, login } from '../controllers/authController.js';

const router = express.Router();

// Ruta para registrarse (POST /api/auth/register)
router.post('/register', register);

// Ruta para loguearse (POST /api/auth/login)
router.post('/login', login);

export default router;