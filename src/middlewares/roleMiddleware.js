
// si un organizador no está aprobado, se bloqueale bloquea el paso.
export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) return res.status(500).json({ mensaje: 'Error de servidor' });

    if (!roles.includes(req.user.rol)) {
      return res.status(403).json({ mensaje: `El rol ${req.user.rol} no tiene permiso` });
    }

    // Si es dueño u organizador, verificar aprobación
    if (req.user.rol === 'dueño_club' || req.user.rol === 'organizador') {
       if (!req.user.rolAprobado) {
         return res.status(403).json({ mensaje: 'Tu cuenta está pendiente de aprobación' });
       }
    }
    next();
  };
};