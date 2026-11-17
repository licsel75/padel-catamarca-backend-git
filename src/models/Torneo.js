import mongoose from 'mongoose';

const torneoSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  fecha: { type: Date, required: true },
  
  // 👇 CAMBIO CLAVE: Ahora es un array de referencias a Clubes
  clubes: [{ 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Club', 
    required: true 
  }],
  
  // El organizador del torneo (dueño de club o independiente)
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