import { body, validationResult } from 'express-validator';
import User from '../models/User.js';

export const validateRegister = [
  body('nombre')
    .notEmpty().withMessage('El nombre es obligatorio')
    .isLength({ min: 3, max: 50 }).withMessage('El nombre debe tener entre 3 y 50 caracteres')
    .trim(),

  body('email')
    .notEmpty().withMessage('El email es obligatorio')
    .isEmail().withMessage('Debe ser un email válido')
    .normalizeEmail()
    .custom(async (value) => {
      // Verifico que el correo no exista previamente en MongoDB
      const userExists = await User.findOne({ email: value });
      if (userExists) {
        throw new Error('El email ya está registrado');
      }
      return true;
    }),

  body('password')
    .notEmpty().withMessage('La contraseña es obligatoria')
    .isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),

  // Valido que el rol enviado esté dentro de los permitidos (nunca permito registrarse como 'admin')
  body('rol')
    .optional()
    .isIn(['jugador', 'organizador', 'dueño_club', 'profesor'])
    .withMessage('El rol seleccionado no es válido'),

  // Middleware final que atrapa cualquier error de validación y corta la petición con un 400
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errores: errors.array() });
    }
    next();
  }
];