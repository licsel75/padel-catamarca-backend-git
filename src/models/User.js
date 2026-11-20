import mongoose from 'mongoose';

// Defino el esquema de usuario con validaciones estrictas a nivel de base de datos
const userSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  rol: { 
    type: String, 
    // Incluyo todos los roles válidos de la plataforma, incluyendo 'profesor'
    enum: ['admin', 'dueño_club', 'organizador', 'profesor', 'jugador'],
    default: 'jugador' 
  },
  rolAprobado: {
    type: Boolean,
    // Los jugadores entran aprobados; organizadores, dueños y profesores esperan aprobación del admin
    default: true 
  },
  bloqueado: {
    type: Boolean,
    default: false
  }
}, { timestamps: true });

export default mongoose.model('User', userSchema);