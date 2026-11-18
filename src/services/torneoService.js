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


export const getTorneos = async (filtros) => {
  // Creamos un objeto de consulta vacío
  let query = {};

  // Filtro 1: Por categoría (si el query trae "categoria")
  if (filtros.categoria) {
    query.categorias = { $in: [filtros.categoria] };
  }

  // Filtro 2: Por club (si el query trae "club")
  if (filtros.club) {
    query.clubes = { $in: [filtros.club] };
  }

  return await Torneo.find(query)
    .populate('clubes', 'nombre direccion')
    .populate('usuario', 'nombre email')
    .sort({ fechaInicio: 1 }); // Ordenamos por fecha de inicio
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