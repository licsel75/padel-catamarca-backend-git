import mongoose from 'mongoose';

const clubSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  departamento: { 
    type: String, 
    required: true,
    default: 'Capital'
  },
  direccion: { type: String, required: true },
  telefono: { type: String, required: true },
  servicios: [{ type: String }],
  usuario: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  }
}, { timestamps: true });

export default mongoose.model('Club', clubSchema);