import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import dns from 'dns/promises'; // 👈 NUEVO
import User from './src/models/User.js';

dotenv.config();

//  Forzamos los DNS para evitar el error de red
dns.setServers(['8.8.8.8', '1.1.1.1']);



const crearAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('admin123', salt);

    await User.create({
      nombre: 'Admin General 2',
      email: 'admin@padel.com',
      password: hashedPassword, // 
      rol: 'admin',
      rolAprobado: true
    });

    console.log('✅ Admin creado con éxito. Contraseña: admin123');
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

crearAdmin();
