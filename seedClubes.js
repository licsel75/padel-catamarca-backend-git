import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Club from './src/models/Club.js';
import User from './src/models/User.js';

import dns from 'node:dns';
dns.setServers(['8.8.8.8', '1.1.1.1']);

dotenv.config();

const clubesReales = [
  {
    nombre: 'Pádel One Indoor',
    departamento: 'Capital',
    direccion: 'Av. Presidente Castillo 1179',
    telefono: '3834643201',
    ubicacionMaps: '',
    sitioWeb: 'https://padelone.com.ar/',
    instagram: '@p1.catamarca',
    facebook: '',
    x: '',
    servicios: ['Canchas blindex', 'Techado', 'Cantina', 'Vestuarios']
  },
  {
    nombre: 'Pádel One Outdoor',
    departamento: 'Capital',
    direccion: 'Rotonda Av. Almonacid esq. Los Sauces',
    telefono: '3834643201',
    ubicacionMaps: '',
    sitioWeb: 'https://padelone.com.ar/',
    instagram: '@p1.catamarca',
    facebook: '',
    x: '',
    servicios: ['Canchas blindex', 'Cantina', 'Estacionamiento']
  },
  {
    nombre: 'Citi Padel Club',
    departamento: 'Capital',
    direccion: 'Av. Ramón Recalde 2600',
    telefono: '3834525144',
    ubicacionMaps: '',
    sitioWeb: '',
    instagram: '',
    facebook: '',
    x: '',
    servicios: []
  },
  {
    nombre: 'Indian Padel Club',
    departamento: 'Capital',
    direccion: 'Av. Presidente Castillo 1121',
    telefono: '3834888388',
    ubicacionMaps: '',
    sitioWeb: '',
    instagram: '',
    facebook: '',
    x: '',
    servicios: []
  },
  {
    nombre: 'Open Padel',
    departamento: 'Capital',
    direccion: 'Dr. Manuel Navarro 150',
    telefono: '3834013521',
    ubicacionMaps: '',
    sitioWeb: '',
    instagram: '',
    facebook: 'https://www.facebook.com/443178402426632',
    x: '',
    servicios: []
  },
  {
    nombre: 'Luck Padel',
    departamento: 'Capital',
    direccion: 'Camilo Melet 590',
    telefono: 'A confirmar',
    ubicacionMaps: '',
    sitioWeb: '',
    instagram: '',
    facebook: '',
    x: '',
    servicios: []
  },
  {
    nombre: 'Las Rejas Tennis Club',
    departamento: 'Capital',
    direccion: 'Av. Ocampo Km 3 / Ruta 4',
    telefono: '3834458496',
    ubicacionMaps: '',
    sitioWeb: '',
    instagram: '@lasrejascluboficial',
    facebook: 'https://www.facebook.com/clublasrejas',
    x: '',
    servicios: []
  },
  {
    nombre: 'Adami Padel',
    departamento: 'Capital',
    direccion: 'Av. Acosta Villafañez 2051',
    telefono: '3834592083',
    ubicacionMaps: '',
    sitioWeb: '',
    instagram: '',
    facebook: '',
    x: '',
    servicios: []
  },
  {
    nombre: 'IL Padel',
    departamento: 'Capital',
    direccion: 'Adán Quiroga 782',
    telefono: 'A confirmar',
    ubicacionMaps: '',
    sitioWeb: '',
    instagram: '',
    facebook: '',
    x: '',
    servicios: []
  },
  {
    nombre: 'Liberty Padel',
    departamento: 'Capital',
    direccion: 'Caseros esq. Chacabuco',
    telefono: 'A confirmar',
    ubicacionMaps: '',
    sitioWeb: '',
    instagram: '',
    facebook: '',
    x: '',
    servicios: []
  },
  {
    nombre: 'X3',
    departamento: 'Capital',
    direccion: 'San Fernando del Valle de Catamarca',
    telefono: 'A confirmar',
    ubicacionMaps: '',
    sitioWeb: '',
    instagram: '',
    facebook: '',
    x: '',
    servicios: []
  },
  {
    nombre: 'Break Padel',
    departamento: 'Capital',
    direccion: 'Banda de Varela',
    telefono: 'A confirmar',
    ubicacionMaps: '',
    sitioWeb: '',
    instagram: '',
    facebook: '',
    x: '',
    servicios: []
  },
  {
    nombre: 'Polideportivo Municipal Mario Kokin Aragón',
    departamento: 'Capital',
    direccion: 'Gral. Navarro 300',
    telefono: 'A confirmar',
    ubicacionMaps: '',
    sitioWeb: '',
    instagram: '',
    facebook: '',
    x: '',
    servicios: []
  },
  {
    nombre: 'New Face',
    departamento: 'Capital',
    direccion: 'Av. Ocampo y Av. Camino a Ojo de Agua',
    telefono: 'A confirmar',
    ubicacionMaps: '',
    sitioWeb: '',
    instagram: '',
    facebook: '',
    x: '',
    servicios: []
  },
  {
    nombre: 'Club Pelota Paleta',
    departamento: 'Capital',
    direccion: 'San Fernando del Valle de Catamarca',
    telefono: 'A confirmar',
    ubicacionMaps: '',
    sitioWeb: '',
    instagram: '',
    facebook: '',
    x: '',
    servicios: []
  },
  {
    nombre: 'El Cerrito Padel',
    departamento: 'Santa María',
    direccion: 'Av. Vicente Saadi',
    telefono: '3838401495',
    ubicacionMaps: '',
    sitioWeb: '',
    instagram: '',
    facebook: '',
    x: '',
    servicios: []
  },
  {
    nombre: 'B&J Padel',
    departamento: 'Santa María',
    direccion: 'Av. Hipólito Yrigoyen s/n',
    telefono: '3838602012',
    ubicacionMaps: '',
    sitioWeb: '',
    instagram: '',
    facebook: '',
    x: '',
    servicios: []
  },
  {
    nombre: 'Maderas Padel Club',
    departamento: 'Santa María',
    direccion: 'San Martín 346',
    telefono: 'A confirmar',
    ubicacionMaps: '',
    sitioWeb: '',
    instagram: '',
    facebook: '',
    x: '',
    servicios: []
  },
  {
    nombre: 'Arena Padel 360°',
    departamento: 'Tinogasta',
    direccion: 'Fiambalá',
    telefono: 'A confirmar',
    ubicacionMaps: '',
    sitioWeb: '',
    instagram: '',
    facebook: '',
    x: '',
    servicios: []
  },
  {
    nombre: 'Cancha de Pádel Imperio',
    departamento: 'Tinogasta',
    direccion: 'Fiambalá',
    telefono: 'A confirmar',
    ubicacionMaps: '',
    sitioWeb: '',
    instagram: '',
    facebook: '',
    x: '',
    servicios: []
  },
  {
    nombre: 'Barbero Master Padel',
    departamento: 'La Paz',
    direccion: 'Icaño',
    telefono: 'A confirmar',
    ubicacionMaps: '',
    sitioWeb: '',
    instagram: '',
    facebook: '',
    x: '',
    servicios: []
  },
  {
    nombre: 'Club Tiro Federal',
    departamento: 'Belén',
    direccion: 'Belén',
    telefono: 'A confirmar',
    ubicacionMaps: '',
    sitioWeb: '',
    instagram: '',
    facebook: '',
    x: '',
    servicios: []
  },
  {
    nombre: 'Complejo Don Mario',
    departamento: 'Santa María',
    direccion: 'San José',
    telefono: 'A confirmar',
    ubicacionMaps: '',
    sitioWeb: '',
    instagram: '',
    facebook: '',
    x: '',
    servicios: []
  },
  {
    nombre: 'ND9 Padel',
    departamento: 'Andalgalá',
    direccion: 'Andalgalá',
    telefono: 'A confirmar',
    ubicacionMaps: '',
    sitioWeb: '',
    instagram: '',
    facebook: '',
    x: '',
    servicios: []
  },
  {
    nombre: 'Cancha de Pádel La Merced',
    departamento: 'Paclín',
    direccion: 'La Merced',
    telefono: 'A confirmar',
    ubicacionMaps: '',
    sitioWeb: '',
    instagram: '',
    facebook: '',
    x: '',
    servicios: []
  }
];

const cargarClubes = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Conectado a MongoDB Atlas...');

    // Busco tu usuario admin para asignarle la autoría con su ObjectId real
    const admin = await User.findOne({ rol: 'admin' });
    if (!admin) {
      throw new Error('No se encontró ningún usuario con rol admin en la base de datos.');
    }

    // Asigno el ObjectId del admin a cada club antes de insertar
    const clubesConUsuario = clubesReales.map((club) => ({
      ...club,
      usuario: admin._id
    }));

    // Limpio clubes previos por seguridad e inserto los 25 clubes validados por Mongoose
    await Club.deleteMany({});
    const insertados = await Club.insertMany(clubesConUsuario);

    console.log(`✅ Se cargaron ${insertados.length} clubes correctamente a nombre de ${admin.nombre} (${admin._id}).`);
    process.exit(0);
  } catch (error) {
    console.error('❌ Error al cargar clubes:', error.message);
    process.exit(1);
  }
};

cargarClubes();