import Torneo from '../models/Torneo.js';
import Club from '../models/Club.js';

export const createTorneo = async (data, userId) => {
  // 1. Validar que los clubes existan
  const clubesExisten = await Club.find({ '_id': { $in: data.clubes } });
  if (clubesExisten.length !== data.clubes.length) {
    throw new Error('Uno o más clubes no existen');
  }

  // 2. Validar fechas
  const inicio = new Date(data.fechaInicio);
  const fin = new Date(data.fechaFin);
  
  if (fin < inicio) {
    throw new Error('La fecha de fin no puede ser anterior a la fecha de inicio');
  }

  // 3. Crear el torneo
  const nuevoTorneo = await Torneo.create({
    ...data,
    usuario: userId
  });
  return nuevoTorneo;
};



export const getTorneos = async () => {
  // populate trae los datos de los clubes y del organizador
  return await Torneo.find()
    .populate('clubes', 'nombre direccion')
    .populate('usuario', 'nombre email')
    .sort({ fecha: 1 }); // Ordenados por fecha (los más próximos primero)
};

export const getTorneoById = async (id) => {
  const torneo = await Torneo.findById(id)
    .populate('clubes', 'nombre direccion')
    .populate('usuario', 'nombre email');
  if (!torneo) throw new Error('Torneo no encontrado');
  return torneo;
};

export const updateTorneo = async (id, data) => {
  const torneoActualizado = await Torneo.findByIdAndUpdate(id, data, { new: true });
  if (!torneoActualizado) throw new Error('Torneo no encontrado');
  return torneoActualizado;
};

export const deleteTorneo = async (id) => {
  const torneo = await Torneo.findByIdAndDelete(id);
  if (!torneo) throw new Error('Torneo no encontrado');
  return torneo;
};