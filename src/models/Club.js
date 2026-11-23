import mongoose from 'mongoose';

const clubSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: [true, 'El nombre del club es obligatorio'],
      trim: true
    },
    departamento: {
      type: String,
      default: 'Capital',
      trim: true
    },
    direccion: {
      type: String,
      required: [true, 'La dirección es obligatoria'],
      trim: true
    },
    telefono: {
      type: String,
      required: [true, 'El teléfono es obligatorio'],
      trim: true
    },
    ubicacionMaps: {
      type: String,
      default: '',
      trim: true
    },
    sitioWeb: {
      type: String,
      default: '',
      trim: true
    },
    instagram: {
      type: String,
      default: '',
      trim: true
    },
    facebook: {
      type: String,
      default: '',
      trim: true
    },
    x: {
      type: String,
      default: '',
      trim: true
    },
    servicios: {
      type: [String],
      default: []
    },
    esSponsor: {
      type: Boolean,
      default: false
    },
    usuario: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model('Club', clubSchema);