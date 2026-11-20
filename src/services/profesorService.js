import PerfilProfesor from '../models/PerfilProfesor.js';

// 1. OBTENER TODOS LOS ANUNCIOS ACTIVOS (Para la vidriera pública)
export const getPerfilesActivos = async () => {
  // Traigo solo los perfiles activos y populo el nombre del usuario y los clubes donde enseña
  return await PerfilProfesor.find({ activo: true })
    .populate('usuario', 'nombre email')
    .populate('clubes', 'nombre departamento direccion')
    .sort({ updatedAt: -1 });
};

// 2. OBTENER EL PERFIL DEL PROFESOR LOGUEADO (Para precargar su formulario en Mi Panel)
export const getMiPerfil = async (usuarioId) => {
  return await PerfilProfesor.findOne({ usuario: usuarioId })
    .populate('clubes', 'nombre departamento');
};

// 3. CREAR O ACTUALIZAR EL ANUNCIO (Upsert: si no existe lo crea, si existe lo actualiza)
export const guardarMiPerfil = async (data, user) => {
  // Verifico que el profesor tenga su cuenta aprobada por el administrador antes de publicar
  if (user.rol !== 'admin' && !user.rolAprobado) {
    throw new Error('Tu cuenta de profesor aún está pendiente de aprobación por un administrador.');
  }

  // Busco si este usuario ya tiene un perfil creado previamente
  let perfil = await PerfilProfesor.findOne({ usuario: user.id });

  if (perfil) {
    // Si ya existe, actualizo sus campos manteniendo su propiedad
    perfil.titulo = data.titulo;
    perfil.estudios = data.estudios || '';
    perfil.clubes = data.clubes || [];
    perfil.niveles = data.niveles || [];
    perfil.diasHorarios = data.diasHorarios;
    perfil.telefono = data.telefono;
    perfil.descripcion = data.descripcion || '';
    perfil.activo = data.activo !== undefined ? data.activo : true;

    await perfil.save();
    return perfil;
  }

  // Si es la primera vez que publica, creo el documento asociado a su ID de usuario
  const nuevoPerfil = await PerfilProfesor.create({
    usuario: user.id,
    titulo: data.titulo,
    estudios: data.estudios || '',
    clubes: data.clubes || [],
    niveles: data.niveles || [],
    diasHorarios: data.diasHorarios,
    telefono: data.telefono,
    descripcion: data.descripcion || '',
    activo: true
  });

  return nuevoPerfil;
};

// 4. ELIMINAR ANUNCIO (Solo el dueño del perfil o un administrador)
export const eliminarPerfil = async (id, user) => {
  const perfil = await PerfilProfesor.findById(id);
  if (!perfil) {
    throw new Error('Publicación no encontrada');
  }

  // Valido propiedad: solo el profesor dueño o el admin pueden borrarlo
  if (user.rol !== 'admin' && perfil.usuario.toString() !== user.id) {
    throw new Error('No tenés permiso para eliminar esta publicación');
  }

  await PerfilProfesor.findByIdAndDelete(id);
};