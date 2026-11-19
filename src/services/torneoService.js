import Torneo from '../models/Torneo.js';
import Club from '../models/Club.js';

export const createTorneo = async (data, userId) => {
  const clubesExisten = await Club.find({ '_id': { $in: data.clubes } });
  if (clubesExisten.length !== data.clubes.length) {
    throw new Error('Uno o más clubes no existen');
  }

  const inicio = new Date(data.fechaInicio);
  const fin = new Date(data.fechaFin);
  
  if (fin < inicio) {
    throw new Error('La fecha de fin no puede ser anterior a la fecha de inicio');
  }

  const nuevoTorneo = await Torneo.create({
    ...data,
    usuario: userId
  });
  return nuevoTorneo;
};

export const getTorneos = async (filtros) => {
  let query = {};

  if (filtros.categoria) {
    query.categorias = { $in: [filtros.categoria] };
  }

  if (filtros.club) {
    query.clubes = { $in: [filtros.club] };
  }

  return await Torneo.find(query)
    .populate('clubes', 'nombre direccion')
    .populate('usuario', 'nombre email')
    .sort({ fechaInicio: 1 });
};

export const getTorneoById = async (id) => {
  const torneo = await Torneo.findById(id)
    .populate('clubes', 'nombre direccion')
    .populate('usuario', 'nombre email');
  if (!torneo) throw new Error('Torneo no encontrado');
  return torneo;
};

export const updateTorneo = async (id, data, user) => {
  const torneo = await Torneo.findById(id);
  if (!torneo) throw new Error('Torneo no encontrado');

  if (user.rol !== 'admin' && torneo.usuario.toString() !== user.id) {
    throw new Error('No tenés permiso para editar un torneo que no creaste');
  }

  return await Torneo.findByIdAndUpdate(id, data, { new: true });
};

export const deleteTorneo = async (id, user) => {
  const torneo = await Torneo.findById(id);
  if (!torneo) throw new Error('Torneo no encontrado');

  if (user.rol !== 'admin' && torneo.usuario.toString() !== user.id) {
    throw new Error('No tenés permiso para eliminar un torneo que no creaste');
  }

  return await Torneo.findByIdAndDelete(id);
};