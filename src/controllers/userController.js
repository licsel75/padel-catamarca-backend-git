import bcrypt from 'bcryptjs';
import User from '../models/User.js';

// Listar todos los usuarios (excluyo siempre el hash de la contraseña por seguridad)
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select('-password').sort({ createdAt: -1 });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los usuarios' });
  }
};

// Obtener un usuario puntual por ID para precargar el formulario de edición del administrador
export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select('-password');
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: 'ID de usuario inválido' });
  }
};

// Editar los datos y permisos de un usuario desde el Panel de Administración
export const updateUser = async (req, res) => {
  try {
    const { nombre, email, rol, rolAprobado, password } = req.body;

    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });

    // Si el administrador cambió el email, verifico que no esté ocupado por otra cuenta
    if (email && email !== user.email) {
      const emailOcupado = await User.findOne({ email });
      if (emailOcupado) {
        return res.status(400).json({ error: 'Ese email ya está registrado por otro usuario' });
      }
      user.email = email;
    }

    // Evito que el administrador se quite por accidente su propio rol de admin
    if (req.params.id === req.user.id && rol && rol !== 'admin') {
      return res.status(400).json({ error: 'No podés quitarte tu propio rol de administrador' });
    }

    if (nombre) user.nombre = nombre;
    if (rol) user.rol = rol;
    if (typeof rolAprobado === 'boolean') user.rolAprobado = rolAprobado;

    // Si el administrador escribió una contraseña nueva, la encripto antes de guardar
    if (password && password.trim().length >= 6) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password.trim(), salt);
    }

    await user.save();

    const userActualizado = user.toObject();
    delete userActualizado.password;

    res.json({ mensaje: 'Usuario actualizado con éxito', user: userActualizado });
  } catch (error) {
    res.status(400).json({ error: error.message || 'Error al actualizar el usuario' });
  }
};

// Aprobar rol pendiente (organizador, dueño_club o profesor)
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