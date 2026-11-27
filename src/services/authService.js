
import bcrypt from 'bcryptjs'; // Importo bcryptjs para encriptar (hashear) contraseñas de forma irreversible y verificarlas de manera segura

import jwt from 'jsonwebtoken';// Importo jsonwebtoken para generar y firmar los tokens de sesión (JWT) que autentican al usuario en cada petición

import User from '../models/User.js';// Importo el modelo User de Mongoose para consultar, crear y validar registros en la colección de usuarios de MongoDB






//  REGISTRO DE USUARIOS

export const registerUser = async (userData) => {
  // Desestructuro únicamente los campos permitidos del payload para evitar inyección de propiedades sensibles (Mass Assignment),
  // como que alguien mande 'rol: "admin"' o 'rolAprobado: true' en el body.
  const { nombre, email, password, rol } = userData;

  // Verifico unicidad de email antes del hasheo de contraseña
  const userExists = await User.findOne({ email });
  if (userExists) throw new Error('El email ya está registrado');

  // Nunca guardo contraseñas en texto plano: genero un salt aleatorio de 10 rondas (balance óptimo entre seguridad y rendimiento)
  // y calculo el hash irreversible con bcrypt.
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Defino una lista blanca (whitelist) de roles privilegiados que requieren validación manual de un administrador
  const rolesConAprobacion = ['dueño_club', 'organizador', 'profesor'];

  // Por defecto (principio de mínimo privilegio), todo usuario nace como 'jugador' y aprobado automáticamente
  let rolFinal = 'jugador';
  let aprobado = true;

  // Solo si el rol solicitado está dentro de mi whitelist, lo asigno pero lo dejo en estado pendiente (aprobado = false)
  // para evitar que cualquiera se registre y publique torneos o clubes sin verificación.
  if (rol && rolesConAprobacion.includes(rol)) {
    rolFinal = rol;
    aprobado = false;
  }

  // Persisto el nuevo usuario en MongoDB usando mi whitelist de campos limpios
  const newUser = await User.create({
    nombre,
    email,
    password: hashedPassword,
    rol: rolFinal,
    rolAprobado: aprobado,
    bloqueado: false
  });

  return newUser;
};












// INICIO DE SESIÓN (LOGIN)

export const loginUser = async (email, password) => {
  // Busco al usuario por email
  const user = await User.findOne({ email });
  



  // Uso un mensaje de error genérico ('Credenciales inválidas') tanto si no existe el email como si falla la clave,
  // para evitar ataques de enumeración de usuarios (no revelo qué correos están registrados).
  if (!user) {
    throw new Error('Credenciales inválidas'); //USUARIO INEXISTENTE
  }

  // Corto el flujo temprano (Fail-Fast) si el administrador suspendió la cuenta
  if (user.bloqueado) {
    throw new Error('Tu cuenta ha sido bloqueada por un administrador. Contactá al soporte.');
  }


  
  // Comparo la contraseña recibida en texto plano contra el hash guardado en la BD usando bcrypt.compare
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Credenciales inválidas');
  }

  // Firmo un JSON Web Token (JWT) con un payload mínimo (id y rol) usando mi clave secreta de entorno
  // y una expiración de 1 día ('1d') para limitar la ventana de riesgo si el token llegara a filtrarse.
  const token = jwt.sign(
    { id: user._id, rol: user.rol },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
  );

  // Devuelvo el token y una proyección limpia del usuario (omito explícitamente el campo 'password' para no exponer el hash)
  return {
    token,
    user: {
      id: user._id,
      nombre: user.nombre,
      rol: user.rol,
      rolAprobado: user.rolAprobado
    }
  };
};