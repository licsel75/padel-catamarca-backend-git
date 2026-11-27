// Implemento un "Middleware Factory" (una función que recibe los roles permitidos y devuelve el middleware real).
// Uso el operador Rest (...roles) para aceptar cualquier cantidad de argumentos y agruparlos automáticamente en un array
// (por ejemplo: authorize('organizador', 'dueño_club', 'admin') -> roles = ['organizador', 'dueño_club', 'admin']).
export const authorize = (...roles) => {
  // Retorno la función middleware estándar de Express con acceso por closure al array 'roles'
  return (req, res, next) => {
    // Programación defensiva: este middleware depende de que 'protect' se haya ejecutado antes e inyectado 'req.user'.
    // Si por un error de configuración en las rutas se llamara a 'authorize' sin 'protect', devuelvo 500 para alertar el fallo interno.
    if (!req.user) {
      return res.status(500).json({ mensaje: 'Error de servidor' });
    }

    //  Control de acceso basado en roles (RBAC): verifico si el rol actual del usuario está dentro de la lista blanca permitida para esta ruta.
    // Si no tiene el rol adecuado, respondo 403 (Forbidden) porque sabemos quién es, pero no tiene privilegios.
    if (!roles.includes(req.user.rol)) {
      return res.status(403).json({ mensaje: `El rol ${req.user.rol} no tiene permiso` });
    }

    //  Regla de negocio de moderación: para roles con capacidad de gestionar entidades públicas ('dueño_club' u 'organizador'),
    // no alcanza con tener el rol asignado; verifico que un administrador haya aprobado manualmente su cuenta.
    if (req.user.rol === 'dueño_club' || req.user.rol === 'organizador') {
      if (!req.user.rolAprobado) {
        return res.status(403).json({ mensaje: 'Tu cuenta está pendiente de aprobación' });
      }
    }

    // 3. Superadas todas las barreras de autorización, cedo el flujo al validador de datos o al controlador
    next();
  };
};