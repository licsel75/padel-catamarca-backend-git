import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// Middleware que intercepta las peticiones privadas para verificar que el usuario envió un token JWT válido
export const protect = async (req, res, next) => {
  let token;

  // Verifico que el header Authorization exista y comience con el esquema "Bearer"
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Extraigo el token separando la palabra "Bearer" del hash
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Busco al usuario actual en MongoDB (excluyendo la contraseña) para tener su rol y estado actualizados
      req.user = await User.findById(decoded.id).select('-password');

      if (!req.user) {
        return res.status(401).json({ mensaje: 'Usuario no encontrado' });
      }

      // Si un administrador bloqueó la cuenta mientras la sesión estaba abierta, corto el acceso inmediatamente
      if (req.user.bloqueado) {
        return res.status(403).json({ mensaje: 'Tu cuenta ha sido bloqueada por un administrador' });
      }

      return next();
    } catch (error) {
      return res.status(401).json({ mensaje: 'Token no válido o expirado' });
    }
  }

  if (!token) {
    return res.status(401).json({ mensaje: 'No autorizado, no hay token' });
  }
};