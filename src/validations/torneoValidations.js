import { body, validationResult } from 'express-validator';

export const validateTorneo = [
  body('nombre')
    .notEmpty().withMessage('El nombre del torneo es obligatorio')
    .isLength({ min: 3 }).withMessage('El nombre debe tener al menos 3 caracteres'),

  body('fechaInicio')
    .notEmpty().withMessage('La fecha de inicio es obligatoria')
    .isISO8601().withMessage('Formato de fecha de inicio inválido'),

  body('fechaFin')
    .notEmpty().withMessage('La fecha de fin es obligatoria')
    .isISO8601().withMessage('Formato de fecha de fin inválido')
    .custom((value, { req }) => {
      // Validación lógica: La fecha de fin no puede ser anterior a la de inicio
      if (new Date(value) < new Date(req.body.fechaInicio)) {
        throw new Error('La fecha de fin no puede ser anterior a la fecha de inicio');
      }
      return true;
    }),

  body('clubes')
    .isArray({ min: 1 }).withMessage('Debe seleccionar al menos un club'),

  body('categorias')
    .isArray({ min: 1 }).withMessage('Debe haber al menos una categoría'),

   body('premio')
    .optional()
    .isLength({ max: 50 }).withMessage('El premio no puede superar los 50 caracteres'),
  
  // Middleware para atrapar los errores
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errores: errors.array() });
    }
     

  
    next();
  }
];