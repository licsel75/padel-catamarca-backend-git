import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// 1. REGISTRO
export const registerUser = async (userData) => {
  const { nombre, email, password, rol: rolSolicitado } = userData;

  const userExists = await User.findOne({ email });
  if (userExists) throw new Error('El email ya está registrado');

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  let rolFinal = 'jugador';
  let aprobado = true;

  if (rolSolicitado === 'dueño_club' || rolSolicitado === 'organizador') {
    rolFinal = rolSolicitado; 
    aprobado = false; 
  }

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

// 2. LOGIN
export const loginUser = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('Credenciales inválidas');
  }

  // Verificar si la cuenta fue bloqueada por el admin
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