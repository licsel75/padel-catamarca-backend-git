import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  rol: { 
    type: String, 
    enum: ['admin', 'dueño_club', 'organizador', 'jugador'],
    default: 'jugador' 
  },
  rolAprobado: {
    type: Boolean,
    default: true // Jugadores true, organizadores/dueños false hasta que el admin apruebe
  },
  bloqueado: {
    type: Boolean,
    default: false // El admin puede cambiar esto a true para bloquear el acceso
  }
}, { timestamps: true });

export default mongoose.model('User', userSchema);