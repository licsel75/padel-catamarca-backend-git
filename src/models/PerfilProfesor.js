import mongoose from 'mongoose';

// Defino el esquema para la tarjeta publicitaria de cada profesor.
// Lo separo del modelo User para mantener el documento de usuario liviano y escalable.
const perfilProfesorSchema = new mongoose.Schema({
  // Relación 1 a 1 con el usuario logueado (unique: true asegura que cada profe tenga un solo anuncio)
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  titulo: {
    type: String,
    required: [true, 'El título del anuncio es obligatorio'],
    trim: true,
    maxlength: 60
  },
  // Array de clubes donde dicta clases (reutilizo las referencias a mi colección Club)
  clubes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Club'
  }],
  // Niveles o categorías que entrena (ej: ["Iniciación", "7ma", "6ta", "5ta"])
  niveles: [{
    type: String,
    trim: true
  }],
  diasHorarios: {
    type: String,
    required: [true, 'Los días y horarios son obligatorios'],
    trim: true,
    maxlength: 100
  },
  telefono: {
    type: String,
    required: [true, 'El teléfono de contacto es obligatorio'],
    trim: true
  },
  descripcion: {
    type: String,
    trim: true,
    maxlength: 250
  },
   estudios: {
    type: String,
    trim: true,
    maxlength: 250
  },
  // Permito que el profesor o el admin puedan pausar temporalmente la publicación sin borrarla
  activo: {
    type: Boolean,
    default: true
  },

 
 
  esDestacado: {
    type: Boolean,
    default: false
  }






}, { timestamps: true });

export default mongoose.model('PerfilProfesor', perfilProfesorSchema);