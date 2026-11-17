import mongoose from 'mongoose';

const favoritoSchema = new mongoose.Schema({
  jugador: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  torneo: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Torneo', 
    required: true 
  }
}, { timestamps: true });

export default mongoose.model('Favorito', favoritoSchema);