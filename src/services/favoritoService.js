import Favorito from '../models/Favorito.js';

export const toggleFavorito = async (userId, torneoId) => {
  // Buscamos si el jugador ya tiene ese torneo guardado
  const existe = await Favorito.findOne({ jugador: userId, torneo: torneoId });

  if (existe) {
    // Si ya existe, lo eliminamos (Toggle)
    await Favorito.findByIdAndDelete(existe._id);
    return { mensaje: 'Torneo eliminado de tu agenda', agregado: false };
  } else {
    // Si no existe, lo creamos
    await Favorito.create({ jugador: userId, torneo: torneoId });
    return { mensaje: 'Torneo agregado a tu agenda', agregado: true };
  }
};

export const getMisFavoritos = async (userId) => {
  // Buscamos todos los favoritos del jugador y traemos los datos del torneo
  return await Favorito.find({ jugador: userId })
    .populate({
      path: 'torneo',
      populate: { path: 'clubes', select: 'nombre' } // Traemos también el nombre del club del torneo
    });
};