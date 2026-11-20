import * as profesorService from '../services/profesorService.js';

// Lista pública de profesores activos
export const getAll = async (req, res) => {
  try {
    const perfiles = await profesorService.getPerfilesActivos();
    res.json(perfiles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Devuelve el anuncio propio del profesor logueado (o null si todavía no creó uno)
export const getMine = async (req, res) => {
  try {
    const perfil = await profesorService.getMiPerfil(req.user.id);
    res.json(perfil);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Crea o actualiza el anuncio del profesor logueado
export const upsertMine = async (req, res) => {
  try {
    const perfil = await profesorService.guardarMiPerfil(req.body, req.user);
    res.status(200).json(perfil);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Elimina un anuncio por ID
export const remove = async (req, res) => {
  try {
    await profesorService.eliminarPerfil(req.params.id, req.user);
    res.json({ mensaje: 'Publicación eliminada correctamente' });
  } catch (error) {
    res.status(403).json({ error: error.message });
  }
};