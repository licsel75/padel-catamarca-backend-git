import Club from '../models/Club.js';

// Crear un club
export const createClub = async (data, userId) => {
  const nuevoClub = await Club.create({
    ...data,
    usuario: userId // Asignamos el ID del creador
  });
  return nuevoClub;
};

// Obtener todos los clubes
export const getClubes = async () => {
  // .populate trae los datos del usuario en lugar de solo el ID
  return await Club.find().populate('usuario', 'nombre email'); 
};

// Obtener un club por ID
export const getClubById = async (id) => {
  const club = await Club.findById(id).populate('usuario', 'nombre email');
  if (!club) throw new Error('Club no encontrado');
  return club;
};

// Actualizar un club
export const updateClub = async (id, data) => {
  const clubActualizado = await Club.findByIdAndUpdate(id, data, { new: true });
  if (!clubActualizado) throw new Error('Club no encontrado');
  return clubActualizado;
};

// Borrar un club
export const deleteClub = async (id) => {
  const club = await Club.findByIdAndDelete(id);
  if (!club) throw new Error('Club no encontrado');
  return club;
};