import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const protect = async (req, res, next) => {
  let token;

  // 1. Verificamos si el token viene en el header "Authorization"
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // 2. Extraemos el token (sacamos la palabra "Bearer ")
      token = req.headers.authorization.split(' ')[1];

      // 3. Verificamos la firma del token con nuestro secreto
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // 4. Buscamos al usuario en la base de datos (sin la contraseña) y lo guardamos en "req.user"
      req.user = await User.findById(decoded.id).select('-password');

      // 5. Si todo está bien, le decimos a Express que continúe a la siguiente función
      next();
    } catch (error) {
      res.status(401).json({ mensaje: 'Token no válido o expirado' });
    }
  }

  // Si no hay token, bloqueamos el acceso
  if (!token) {
    res.status(401).json({ mensaje: 'No autorizado, no hay token' });
  }
};