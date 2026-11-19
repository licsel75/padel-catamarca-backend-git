import User from '../models/User.js';

// Listar todos los usuarios (sin mostrar contraseñas)
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los usuarios' });
  }
};

// Aprobar rol de organizador / dueño_club
export const aprobarUsuario = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id, 
      { rolAprobado: true }, 
      { new: true }
    ).select('-password');
    
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json({ mensaje: 'Usuario aprobado con éxito', user });
  } catch (error) {
    res.status(400).json({ error: 'Error al aprobar usuario' });
  }
};

// Bloquear o desbloquear usuario (Toggle)
export const toggleBloqueoUsuario = async (req, res) => {
  try {
    if (req.params.id === req.user.id) {
      return res.status(400).json({ error: 'No podés bloquear tu propia cuenta de administrador' });
    }

    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });

    user.bloqueado = !user.bloqueado;
    await user.save();

    const userSinPassword = user.toObject();
    delete userSinPassword.password;

    res.json({ 
      mensaje: user.bloqueado ? 'Usuario bloqueado' : 'Usuario desbloqueado', 
      user: userSinPassword 
    });
  } catch (error) {
    res.status(400).json({ error: 'Error al cambiar estado de bloqueo' });
  }
};