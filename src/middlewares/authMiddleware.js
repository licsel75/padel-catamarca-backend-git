import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      req.user = await User.findById(decoded.id).select('-password');

      if (!req.user) {
        return res.status(401).json({ mensaje: 'Usuario no encontrado' });
      }

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