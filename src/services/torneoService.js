import Torneo from '../models/Torneo.js';
import Club from '../models/Club.js';

// Esta es la capa de servicios: acá vive toda la lógica de negocio pura y la interacción directa con Mongoose,
// completamente desacoplada de Express (no conoce req ni res, solo recibe datos y devuelve resultados o lanza errores).







export const createTorneo = async (data, userId) => {
  // 1. Integridad referencial: verifico en la BD que todos los IDs de clubes enviados realmente existan.
  // Comparo la cantidad de resultados encontrados con el largo del array recibido para detectar IDs falsos o borrados.
  const clubesExisten = await Club.find({ '_id': { $in: data.clubes } });
  if (clubesExisten.length !== data.clubes.length) {
    throw new Error('Uno o más clubes no existen');
  }

  // 2. Regla de negocio temporal: aunque el frontend valide fechas, en el backend vuelvo a garantizar
  // que el torneo no termine antes de empezar.
  const inicio = new Date(data.fechaInicio);
  const fin = new Date(data.fechaFin);
  
  if (fin < inicio) {
    throw new Error('La fecha de fin no puede ser anterior a la fecha de inicio');
  }



  

  // 3. Persistencia: creo el documento asociándolo explícitamente al 'userId' extraído del token JWT
  // (nunca confío en un userId que venga en el body para evitar suplantación de identidad).
  const nuevoTorneo = await Torneo.create({ 
    ...data,
    usuario: userId
  });
  return nuevoTorneo;
};










export const getTorneos = async (filtros) => {
  // Construyo dinámicamente el objeto de consulta para MongoDB según los query params que lleguen
  let query = {};

  // Si filtran por categoría, uso $in porque 'categorias' es un array en el documento Torneo
  if (filtros.categoria) {
    query.categorias = { $in: [filtros.categoria] };
  }

  // Lo mismo para clubes sede, ya que un torneo puede jugarse en múltiples complejos
  if (filtros.club) {
    query.clubes = { $in: [filtros.club] };
  }

  // Uso .populate() con proyección de campos ('nombre direccion') para traer solo los datos públicos necesarios
  // sin exponer contraseñas ni datos sensibles del usuario, y ordeno cronológicamente por fechaInicio ascendente.
  return await Torneo.find(query)
    .populate('clubes', 'nombre direccion')
    .populate('usuario', 'nombre email')
    .sort({ fechaInicio: 1 });
};

export const getTorneoById = async (id) => {
  // Busco un torneo puntual y populo sus relaciones para mostrar el detalle completo en el frontend
  const torneo = await Torneo.findById(id)
    .populate('clubes', 'nombre direccion')
    .populate('usuario', 'nombre email');
    
  if (!torneo) throw new Error('Torneo no encontrado');
  return torneo;
};

export const updateTorneo = async (id, data, user) => {
  // Primero verifico que el recurso exista antes de intentar modificarlo
  const torneo = await Torneo.findById(id);
  if (!torneo) throw new Error('Torneo no encontrado');

  // Control de propiedad (Ownership): el middleware 'authorize' solo verificó el rol general,
  // pero acá valido que el usuario sea realmente el dueño de este torneo (o un 'admin' con acceso total).
  // Uso .toString() porque en Mongoose 'torneo.usuario' es un ObjectId y 'user.id' es un string.
  if (user.rol !== 'admin' && torneo.usuario.toString() !== user.id) {
    throw new Error('No tenés permiso para editar un torneo que no creaste');
  }

  // Uso { new: true } para que Mongoose me devuelva el documento ya actualizado y no la versión anterior
  return await Torneo.findByIdAndUpdate(id, data, { new: true });
};

export const deleteTorneo = async (id, user) => {
  const torneo = await Torneo.findById(id);
  if (!torneo) throw new Error('Torneo no encontrado');

  // Aplico la misma regla de ownership que en la edición para proteger el borrado
  if (user.rol !== 'admin' && torneo.usuario.toString() !== user.id) {
    throw new Error('No tenés permiso para eliminar un torneo que no creaste');
  }

  return await Torneo.findByIdAndDelete(id);
};