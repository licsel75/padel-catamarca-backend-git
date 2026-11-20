import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';

import authRoutes from './routes/authRoutes.js';
import { protect } from './middlewares/authMiddleware.js';
import clubRoutes from './routes/clubRoutes.js';
import userRoutes from './routes/userRoutes.js';
import torneoRoutes from './routes/torneoRoutes.js';
import favoritoRoutes from './routes/favoritoRoutes.js';
import profesorRoutes from './routes/profesorRoutes.js';
// ...







//  Cargo las variables del archivo .env antes de hacer cualquier otra cosa
dotenv.config();

//  Conecto a la base de datos llamando a la función que creamos arriba
connectDB();

//  Inicializamos la aplicación de Express
const app = express();

//  Middlewares globales
app.use(cors()); // Permite peticiones desde el Frontend (React)
app.use(express.json()); // Permite que nuestro servidor entienda y procese JSON


app.use('/api/users', userRoutes);
app.use('/api/clubes', clubRoutes);
app.use('/api/profesores', profesorRoutes);

// Una ruta de prueba (para saber si el servidor está vivo)
app.get('/', (req, res) => {
  res.json({ mensaje: '¡API de Padel Catamarca funcionando! 🎾' });
});

// Ruta de prueba protegida
app.get('/api/test-protegida', protect, (req, res) => {
  res.json({ mensaje: `¡Hola ${req.user.nombre}! Estás viendo una ruta protegida 🎾` });
});


app.use('/api/torneos', torneoRoutes);
app.use('/api/favoritos', favoritoRoutes);

//  Definino el puerto y levantamos el servidor
const PORT = process.env.PORT || 3000;

// Middleware para las rutas de la API
app.use('/api/auth', authRoutes);
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});