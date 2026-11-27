import jwt from 'jsonwebtoken'; // Importo jsonwebtoken para decodificar y verificar la firma criptográfica del token recibido

import User from '../models/User.js'; // Importo el modelo User para validar en tiempo real que el usuario siga existiendo y no esté bloqueado en la BD


// Middleware de autenticación: intercepta las rutas privadas antes de llegar al controlador para asegurar
// que quien hace la petición tiene una sesión válida.
export const protect = async (req, res, next) => {
  let token;

  // Verifico que la petición traiga la cabecera 'Authorization' siguiendo el estándar HTTP "Bearer <token>"
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      //  Separo el string por el espacio en blanco ("Bearer" en índice 0, el token real en índice 1)
      token = req.headers.authorization.split(' ')[1];

      //  Verifico la firma del token con mi clave secreta de entorno. Si fue adulterado o expiró,
      // jwt.verify lanza automáticamente una excepción y salta directo al bloque catch.
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      //  Consulto el usuario fresco en MongoDB usando el 'id' que venía dentro del payload del token.
      // Uso .select('-password') por defensa en profundidad para que el hash jamás viaje pegado en req.user.
      // Al inyectar el usuario en 'req.user', dejo sus datos disponibles para los siguientes middlewares (authorize) y controladores.
      req.user = await User.findById(decoded.id).select('-password');

      // Si el usuario fue eliminado de la base de datos después de emitir el token, corto con 401 (Unauthorized)
      if (!req.user) {
        return res.status(401).json({ mensaje: 'Usuario no encontrado' });
      }

      //  Revocación en tiempo real: aunque el JWT siga vigente por 24hs, si un admin bloqueó al usuario
      // en la BD, le deniego el paso inmediatamente con 403 (Forbidden).
      if (req.user.bloqueado) {
        return res.status(403).json({ mensaje: 'Tu cuenta ha sido bloqueada por un administrador' });
      }

      //  Todo está en orden: llamo a next() para cederle el control al siguiente middleware  o al controlador
      return next();
    } catch (error) {
      // Capturo errores de firma inválida, token malformado o token expirado (TokenExpiredError)
      return res.status(401).json({ mensaje: 'Token no válido o expirado' });
    }
  }

  // Si la cabecera Authorization no vino o no tenía el prefijo 'Bearer', rechazo la petición sin entrar al try
  if (!token) {
    return res.status(401).json({ mensaje: 'No autorizado, no hay token' });
  }
};