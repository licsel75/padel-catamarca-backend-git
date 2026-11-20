import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// 1. REGISTRO: Encripta la contraseña, asigna el rol y define si requiere aprobación
export const registerUser = async (userData) => {
  const { nombre, email, password, rol } = userData;

  const userExists = await User.findOne({ email });
  if (userExists) throw new Error('El email ya está registrado');

  // Hasheo la contraseña con un salt de 10 rondas antes de guardar
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Roles que requieren revisión y aprobación del administrador
  const rolesConAprobacion = ['dueño_club', 'organizador', 'profesor'];

  let rolFinal = 'jugador';
  let aprobado = true;

  if (rol && rolesConAprobacion.includes(rol)) {
    rolFinal = rol;
    aprobado = false;
  }

  // Guardo el usuario en MongoDB asegurando que tanto el rol como rolAprobado persistan
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

// 2. LOGIN: Verifica credenciales, estado de bloqueo y emite el JWT
export const loginUser = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('Credenciales inválidas');
  }

  // Si el administrador bloqueó esta cuenta, impido el acceso
  if (user.bloqueado) {
    throw new Error('Tu cuenta ha sido bloqueada por un administrador. Contactá al soporte.');
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Credenciales inválidas');
  }

  const token = jwt.sign(
    { id: user._id, rol: user.rol },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
  );

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