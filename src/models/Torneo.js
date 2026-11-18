import mongoose from 'mongoose';

const torneoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  fechaInicio: { type: Date, required: true }, // Nuevo
  fechaFin: { type: Date, required: true },    // Nuevo
  clubes: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Club', 
    required: true 
  }],
  usuario: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  categorias: [{ type: String }],
  auspiciantes: [{ type: String }],
  estado: { 
    type: String, 
    enum: ['abierto', 'en curso', 'finalizado'], 
    default: 'abierto' 
  }
}, { timestamps: true });

export default mongoose.model('Torneo', torneoSchema);