import Club from '../models/Club.js';

// Crear un club (máximo 5 para organizadores/dueños, ilimitado para admin)
export const createClub = async (data, user) => {
  if (user.rol !== 'admin') {
    const cantidadClubes = await Club.countDocuments({ usuario: user.id });
    if (cantidadClubes >= 5) {
      throw new Error('Alcanzaste el límite máximo de 5 clubes permitidos por organizador.');
    }
  }

  // Solo un administrador puede asignar el estado de Sponsor
  const datosLimpios = { ...data };
  if (user.rol !== 'admin') {
    delete datosLimpios.esSponsor;
  }

  const nuevoClub = await Club.create({
    ...datosLimpios,
    usuario: user.id
  });
  return nuevoClub;
};

// Obtener todos los clubes (ordenados poniendo los Sponsors primeros)
export const getClubes = async (filtros = {}) => {
  const query = {};
  if (filtros.departamento && filtros.departamento !== 'Todos') {
    query.departamento = filtros.departamento;
  }
  return await Club.find(query)
    .sort({ esSponsor: -1, createdAt: -1 })
    .populate('usuario', 'nombre email');
};

// Obtener un club por ID
export const getClubById = async (id) => {
  const club = await Club.findById(id).populate('usuario', 'nombre email');
  if (!club) throw new Error('Club no encontrado');
  return club;
};

// Actualizar un club (solo dueño o admin)
export const updateClub = async (id, data, user) => {
  const club = await Club.findById(id);
  if (!club) throw new Error('Club no encontrado');

  if (user.rol !== 'admin' && club.usuario.toString() !== user.id) {
    throw new Error('No tenés permiso para editar un club que no creaste');
  }

  // Evito que un dueño modifique su propio estado de Sponsor manipulando el request
  const datosLimpios = { ...data };
  if (user.rol !== 'admin') {
    delete datosLimpios.esSponsor;
  }

  return await Club.findByIdAndUpdate(id, datosLimpios, { new: true });
};

// Borrar un club (solo dueño o admin)
export const deleteClub = async (id, user) => {
  const club = await Club.findById(id);
  if (!club) throw new Error('Club no encontrado');

  if (user.rol !== 'admin' && club.usuario.toString() !== user.id) {
    throw new Error('No tenés permiso para eliminar un club que no creaste');
  }

  return await Club.findByIdAndDelete(id);
};