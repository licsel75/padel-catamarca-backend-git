import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';

//  Cargo las variables del archivo .env antes de hacer cualquier otra cosa
dotenv.config();

//  Conecto a la base de datos llamando a la función que creamos arriba
connectDB();

//  Inicializamos la aplicación de Express
const app = express();

//  Middlewares globales
app.use(cors()); // Permite peticiones desde el Frontend (React)
app.use(express.json()); // Permite que nuestro servidor entienda y procese JSON

// Una ruta de prueba (para saber si el servidor está vivo)
app.get('/', (req, res) => {
  res.json({ mensaje: '¡API de Padel Catamarca funcionando! 🎾' });
});

//  Definino el puerto y levantamos el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});