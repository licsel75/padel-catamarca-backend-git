import * as profesorService from '../services/profesorService.js';

// 1. Obtener todos los perfiles (Público)
export const getAll = async (req, res) => {
  try {
    const perfiles = await profesorService.getPerfilesActivos();
    res.json(perfiles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// 2. Obtener el perfil del profesor logueado
export const getMiPerfil = async (req, res) => {
  try {
    const perfil = await profesorService.getMiPerfil(req.user.id);
    res.json(perfil);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

// 3. Crear o actualizar el perfil
export const guardarPerfil = async (req, res) => {
  try {
    const perfil = await profesorService.guardarMiPerfil(req.body, req.user);
    res.status(200).json({ mensaje: 'Perfil guardado con éxito', perfil });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// 4. Eliminar perfil
export const remove = async (req, res) => {
  try {
    await profesorService.eliminarPerfil(req.params.id, req.user);
    res.json({ mensaje: 'Publicación eliminada correctamente' });
  } catch (error) {
    res.status(403).json({ error: error.message });
  }
};

// 👇 5. NUEVA FUNCIÓN: Destacar/Quitar Destacado (Solo Admin) 👇
export const toggleDestacado = async (req, res) => {
  try {
    const perfil = await profesorService.toggleDestacadoProfesor(req.params.id, req.user);
    res.json({ 
      mensaje: perfil.esDestacado ? 'Profesor destacado' : 'Profesor quitado de destacados', 
      perfil 
    });
  } catch (error) {
    res.status(403).json({ error: error.message });
  }
};