import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  rol: { 
    type: String, 
    enum: ['admin', 'dueño_club', 'organizador', 'jugador'], // <-- Nuevos roles
    default: 'jugador' 
  },
  rolAprobado: {
    type: Boolean,
    default: true // Jugadores true, organizadores/dueños false hasta que el admin apruebe
  }
}, { timestamps: true });

export default mongoose.model('User', userSchema);