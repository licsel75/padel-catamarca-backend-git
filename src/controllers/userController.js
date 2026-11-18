import User from '../models/User.js';

export const aprobarUsuario = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id, 
      { rolAprobado: true }, 
      { new: true }
    );
    res.json({ mensaje: 'Usuario aprobado con éxito', user });
  } catch (error) {
    res.status(404).json({ error: 'Usuario no encontrado' });
  }
};