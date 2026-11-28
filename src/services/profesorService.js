import PerfilProfesor from '../models/PerfilProfesor.js';

//  OBTENER TODOS LOS ANUNCIOS ACTIVOS (Para la vidriera pública)
export const getPerfilesActivos = async () => {
  // Traigo solo los perfiles activos y populo el nombre del usuario y los clubes donde enseña
  return await PerfilProfesor.find({ activo: true })
    .populate('usuario', 'nombre email')
    .populate('clubes', 'nombre departamento direccion')
    .sort({ updatedAt: -1 });
};

//  OBTENER EL PERFIL DEL PROFESOR LOGUEADO (Para precargar su formulario en Mi Panel)
export const getMiPerfil = async (usuarioId) => {
  return await PerfilProfesor.findOne({ usuario: usuarioId })
    .populate('clubes', 'nombre departamento');
};

//  CREAR O ACTUALIZAR EL ANUNCIO (Upsert: si no existe lo crea, si existe lo actualiza)
export const guardarMiPerfil = async (data, user) => {
  if (user.rol !== 'admin' && !user.rolAprobado) {
    throw new Error('Tu cuenta de profesor aún está pendiente de aprobación por un administrador.');
  }

  // 1. Definimos el valor de esDestacado (por defecto lo que venga en data, o false)
  let esDestacadoFinal = data.esDestacado || false;

  // 2. SEGURIDAD: Si el usuario NO es admin, ignoramos lo que mande y forzamos el valor original
  if (user.rol !== 'admin') {
    const perfilExistente = await PerfilProfesor.findOne({ usuario: user.id });
    // Si ya existía, mantenemos su valor anterior. Si es nuevo, es false.
    esDestacadoFinal = perfilExistente ? perfilExistente.esDestacado : false;
  }

  let perfil = await PerfilProfesor.findOne({ usuario: user.id });

  if (perfil) {
    // Actualizo los campos
    perfil.titulo = data.titulo;
    perfil.estudios = data.estudios || '';
    perfil.clubes = data.clubes || [];
    perfil.niveles = data.niveles || [];
    perfil.diasHorarios = data.diasHorarios;
    perfil.telefono = data.telefono;
    perfil.descripcion = data.descripcion || '';
    perfil.activo = data.activo !== undefined ? data.activo : true;
    perfil.esDestacado = esDestacadoFinal; //  ASIGNAMOS EL VALOR SEGURO

    await perfil.save();
    return perfil;
  }

  const nuevoPerfil = await PerfilProfesor.create({
    usuario: user.id,
    titulo: data.titulo,
    estudios: data.estudios || '',
    clubes: data.clubes || [],
    niveles: data.niveles || [],
    diasHorarios: data.diasHorarios,
    telefono: data.telefono,
    descripcion: data.descripcion || '',
    activo: true,
    esDestacado: esDestacadoFinal // ASIGNAMOS EL VALOR SEGURO
  });

  return nuevoPerfil;
};

// ELIMINAR ANUNCIO (Solo el dueño del perfil o un administrador)
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

//  MARCAR/DESMARCAR COMO DESTACADO (Solo admin)
export const toggleDestacadoProfesor = async (id, user) => {
  // Verificamos que sea admin
  if (user.rol !== 'admin') {
    throw new Error('Solo un administrador puede destacar profesores');
  }

  const perfil = await PerfilProfesor.findById(id);
  if (!perfil) throw new Error('Perfil de profesor no encontrado');

  // Invertimos el valor (si era true, pasa a false, y viceversa)
  perfil.esDestacado = !perfil.esDestacado;
  await perfil.save();
  
  return perfil;
};