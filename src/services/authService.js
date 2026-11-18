import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

// 1. REGISTRO: Encripta la contraseña y guarda al usuario
//
export const registerUser = async (userData) => {
  const { nombre, email, password, rol: rolSolicitado } = userData;

  const userExists = await User.findOne({ email });
  if (userExists) throw new Error('El email ya está registrado');

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Lógica de negocio: Roles altos requieren aprobación
  let rolFinal = 'jugador';
  let aprobado = true;

  if (rolSolicitado === 'dueño_club' || rolSolicitado === 'organizador') {
    rolFinal = rolSolicitado; 
    aprobado = false; 
  }

  const newUser = await User.create({
    nombre, email, password: hashedPassword, rol: rolFinal, rolAprobado: aprobado
  });

  return newUser;
};

// 2. LOGIN: Compara contraseñas y genera el Token JWT
export const loginUser = async (email, password) => {
  // Buscamos al usuario por email
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('Credenciales inválidas');
  }

  // Comparamos la contraseña ingresada con la encriptada en la BD
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    throw new Error('Credenciales inválidas');
  }

  // Generamos el Token JWT (expira en 24h)
  const token = jwt.sign(
    { id: user._id, rol: user.rol }, // Payload (datos dentro del token)
    process.env.JWT_SECRET,          // Secreto
    { expiresIn: '1d' }              // Expiración
  );

  return { token, user: { id: user._id, nombre: user.nombre, rol: user.rol } };
};