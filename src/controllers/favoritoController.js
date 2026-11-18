import * as favoritoService from '../services/favoritoService.js';

export const toggle = async (req, res) => {
  try {
    const { torneoId } = req.params;
    // req.user.id viene del token del jugador logueado
    const resultado = await favoritoService.toggleFavorito(req.user.id, torneoId);
    res.json(resultado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getMios = async (req, res) => {
  try {
    const favoritos = await favoritoService.getMisFavoritos(req.user.id);
    res.json(favoritos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};