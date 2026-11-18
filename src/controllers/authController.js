import { registerUser, loginUser } from '../services/authService.js';

// Controlador para el Registro
export const register = async (req, res) => {
  try {
    const newUser = await registerUser(req.body);
    res.status(201).json({ 
      mensaje: 'Usuario registrado con éxito 🎾', 
      user: { id: newUser._id, nombre: newUser.nombre, rol: newUser.rol } 
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Controlador para el Login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const data = await loginUser(email, password);
    res.json(data);
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};