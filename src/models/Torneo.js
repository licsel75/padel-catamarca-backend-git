import mongoose from 'mongoose';

const torneoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  fechaInicio: { type: Date, required: true },
  fechaFin: { type: Date, required: true },
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
  //  NUEVO CAMPO
  premio: { 
    type: String, 
    maxLength: 50 
  },
  estado: { 
    type: String, 
    enum: ['abierto', 'en curso', 'finalizado'], 
    default: 'abierto' 
  }
}, { timestamps: true });

export default mongoose.model('Torneo', torneoSchema);