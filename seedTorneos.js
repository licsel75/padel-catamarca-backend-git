import dns from 'node:dns';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Torneo from './src/models/Torneo.js';
import Club from './src/models/Club.js';
import User from './src/models/User.js';

// Evito bloqueos de resolución SRV en el DNS local
dns.setServers(['8.8.8.8', '1.1.1.1']);
dotenv.config();

const torneosDemo = [
  // ==========================================
  // 1. TORNEOS FINALIZADOS (OCTUBRE - NOVIEMBRE 2026)
  // ==========================================
  {
    nombre: 'Catamarca Pádel Tour - Fecha 4 (DEMO)',
    fechaInicio: new Date('2026-10-09T14:00:00-03:00'),
    fechaFin: new Date('2026-10-12T22:00:00-03:00'),
    nombresClubes: ['Pádel One Indoor', 'Citi Padel Club'],
    categorias: ['5ta', '6ta', '7ma', '8va', 'Damas'],
    premio: '$450.000 en efectivo + trofeos',
    estado: 'finalizado'
  },
  {
    nombre: 'Torneo Homenaje Agustín Tapia - Edición Octubre (DEMO)',
    fechaInicio: new Date('2026-10-22T14:00:00-03:00'),
    fechaFin: new Date('2026-10-25T22:00:00-03:00'),
    nombresClubes: ['Las Rejas Tennis Club', 'Indian Padel Club'],
    categorias: ['4ta', '5ta', '6ta', '7ma', '8va', 'Damas'],
    premio: 'Indumentaria oficial, trofeos y regalos',
    estado: 'finalizado'
  },
  {
    nombre: 'Abierto del Oeste Catamarqueño (DEMO)',
    fechaInicio: new Date('2026-10-30T15:00:00-03:00'),
    fechaFin: new Date('2026-11-01T21:00:00-03:00'),
    nombresClubes: ['Arena Padel 360°'],
    categorias: ['4ta', '5ta', '6ta', '7ma'],
    premio: '$250.000 + trofeos regionales',
    estado: 'finalizado'
  },
  {
    nombre: 'Pádel One Open Primavera (DEMO)',
    fechaInicio: new Date('2026-11-06T14:00:00-03:00'),
    fechaFin: new Date('2026-11-08T22:00:00-03:00'),
    nombresClubes: ['Pádel One Indoor', 'Pádel One Outdoor'],
    categorias: ['3ra', '4ta', '5ta', '6ta', '7ma', '8va', 'Mixto'],
    premio: 'Efectivo y sorteos para inscriptos',
    estado: 'finalizado'
  },
  {
    nombre: 'Copa Entre Amigos Pádel (DEMO)',
    fechaInicio: new Date('2026-11-06T16:00:00-03:00'),
    fechaFin: new Date('2026-11-08T21:00:00-03:00'),
    nombresClubes: ['Indian Padel Club'],
    categorias: ['4ta', '5ta', '6ta', '7ma', '8va'],
    premio: 'Tercer tiempo y cena para participantes',
    estado: 'finalizado'
  },
  {
    nombre: 'Torneo Agustín Tapia - Segunda Edición (DEMO)',
    fechaInicio: new Date('2026-11-12T14:00:00-03:00'),
    fechaFin: new Date('2026-11-15T22:30:00-03:00'),
    nombresClubes: ['Indian Padel Club'],
    categorias: ['4ta', '5ta', '6ta', '7ma', '8va', 'Mixto'],
    premio: 'Indumentaria, asado de camaradería y trofeos',
    estado: 'finalizado'
  },
  {
    nombre: 'Torneo Americano Damas de la Montaña (DEMO)',
    fechaInicio: new Date('2026-11-13T10:00:00-03:00'),
    fechaFin: new Date('2026-11-15T20:00:00-03:00'),
    nombresClubes: ['Cancha de Pádel La Merced'],
    categorias: ['Damas', '8va'],
    premio: 'Premios para campeonas y subcampeonas',
    estado: 'finalizado'
  },

  // ==========================================
  // 2. TORNEOS EN CURSO (SEMANA DEL 23/11/2026)
  // ==========================================
  {
    nombre: 'Torneo Relámpago Nocturno Capital (DEMO)',
    fechaInicio: new Date('2026-11-21T18:00:00-03:00'),
    fechaFin: new Date('2026-11-24T23:30:00-03:00'),
    nombresClubes: ['Adami Padel'],
    categorias: ['5ta', '6ta', '7ma'],
    premio: '$180.000 + paletas de regalo',
    estado: 'en curso'
  },
  {
    nombre: 'Copa Aniversario Valles Calchaquíes (DEMO)',
    fechaInicio: new Date('2026-11-22T10:00:00-03:00'),
    fechaFin: new Date('2026-11-25T22:00:00-03:00'),
    nombresClubes: ['El Cerrito Padel'],
    categorias: ['4ta', '5ta', '6ta', 'Damas'],
    premio: '$280.000 + trofeos artesanales',
    estado: 'en curso'
  },

  // ==========================================
  // 3. TORNEOS PRÓXIMOS (NOVIEMBRE - DICIEMBRE 2026 - ENERO 2027)
  // ==========================================
  {
    nombre: 'Copa Primavera Pádel (DEMO)',
    fechaInicio: new Date('2026-11-27T14:00:00-03:00'),
    fechaFin: new Date('2026-11-29T22:00:00-03:00'),
    nombresClubes: ['Pádel One Indoor'],
    categorias: ['4ta', '5ta', '6ta', '7ma'],
    premio: '$300.000 + trofeos',
    estado: 'abierto'
  },
  {
    nombre: 'Desafío del Este Catamarqueño (DEMO)',
    fechaInicio: new Date('2026-11-28T09:00:00-03:00'),
    fechaFin: new Date('2026-11-29T21:00:00-03:00'),
    nombresClubes: ['Barbero Master Padel'],
    categorias: ['5ta', '6ta', '7ma', '8va'],
    premio: '$200.000 + trofeos',
    estado: 'abierto'
  },
  {
    nombre: 'Open Catamarca 2026 (DEMO)',
    fechaInicio: new Date('2026-12-04T14:00:00-03:00'),
    fechaFin: new Date('2026-12-06T22:00:00-03:00'),
    nombresClubes: ['Indian Padel Club'],
    categorias: ['2da', '3ra', '4ta', '5ta'],
    premio: '$500.000 + trofeos',
    estado: 'abierto'
  },
  {
    nombre: 'Damas en la Cancha (DEMO)',
    fechaInicio: new Date('2026-12-05T10:00:00-03:00'),
    fechaFin: new Date('2026-12-06T21:00:00-03:00'),
    nombresClubes: ['Las Rejas Tennis Club'],
    categorias: ['Damas'],
    premio: 'Indumentaria + trofeos',
    estado: 'abierto'
  },
  {
    nombre: 'Copa Ciudad de Andalgalá (DEMO)',
    fechaInicio: new Date('2026-12-05T14:00:00-03:00'),
    fechaFin: new Date('2026-12-07T22:00:00-03:00'),
    nombresClubes: ['ND9 Padel'],
    categorias: ['4ta', '5ta', '6ta', '7ma'],
    premio: '$260.000 + trofeos',
    estado: 'abierto'
  },
  {
    nombre: 'Copa Capital de Pádel (DEMO)',
    fechaInicio: new Date('2026-12-11T14:00:00-03:00'),
    fechaFin: new Date('2026-12-13T22:00:00-03:00'),
    nombresClubes: ['Citi Padel Club'],
    categorias: ['4ta', '5ta', '6ta'],
    premio: '$400.000 en premios',
    estado: 'abierto'
  },
  {
    nombre: 'Abierto Cuna del Poncho (DEMO)',
    fechaInicio: new Date('2026-12-12T10:00:00-03:00'),
    fechaFin: new Date('2026-12-13T21:00:00-03:00'),
    nombresClubes: ['Club Tiro Federal'],
    categorias: ['5ta', '6ta', '7ma', 'Mixto'],
    premio: 'Trofeos + indumentaria regional',
    estado: 'abierto'
  },
  {
    nombre: 'Torneo Navideño (DEMO)',
    fechaInicio: new Date('2026-12-18T14:00:00-03:00'),
    fechaFin: new Date('2026-12-20T22:00:00-03:00'),
    nombresClubes: ['Open Padel'],
    categorias: ['3ra', '4ta', '5ta', '6ta'],
    premio: '$350.000 + regalos',
    estado: 'abierto'
  },
  {
    nombre: 'Copa Fin de Año (DEMO)',
    fechaInicio: new Date('2026-12-26T10:00:00-03:00'),
    fechaFin: new Date('2026-12-27T22:00:00-03:00'),
    nombresClubes: ['B&J Padel'],
    categorias: ['5ta', '6ta', '7ma', 'Damas'],
    premio: 'Trofeos + indumentaria',
    estado: 'abierto'
  },
  {
    nombre: 'Master Provincial 2026 (DEMO)',
    fechaInicio: new Date('2026-12-28T14:00:00-03:00'),
    fechaFin: new Date('2026-12-31T21:00:00-03:00'),
    nombresClubes: ['Pádel One Indoor', 'Indian Padel Club'],
    categorias: ['1ra', '2da', '3ra', '4ta'],
    premio: '$700.000 + trofeos',
    estado: 'abierto'
  },
  {
    nombre: 'Copa Verano Catamarca 2027 (DEMO)',
    fechaInicio: new Date('2027-01-08T16:00:00-03:00'),
    fechaFin: new Date('2027-01-10T23:00:00-03:00'),
    nombresClubes: ['Pádel One Outdoor', 'Luck Padel'],
    categorias: ['3ra', '4ta', '5ta', '6ta', 'Mixto'],
    premio: '$450.000 + indumentaria de verano',
    estado: 'abierto'
  }
];

const cargarTorneos = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Conectado a MongoDB Atlas...');

    // 1. Busco tu usuario admin para asignarle la autoría
    const admin = await User.findOne({ rol: 'admin' });
    if (!admin) {
      throw new Error('No se encontró ningún usuario con rol admin en la base de datos.');
    }

    // 2. Traigo los clubes reales ya cargados y armo un mapa Nombre -> ObjectId
    const clubesEnBd = await Club.find({});
    const mapaClubes = new Map(
      clubesEnBd.map((c) => [c.nombre.trim().toLowerCase(), c._id])
    );

    // 3. Transformo cada torneo reemplazando los nombres de sede por sus ObjectId reales
    const torneosListos = torneosDemo.map(({ nombresClubes, ...resto }) => {
      const clubesIds = nombresClubes
        .map((nombre) => {
          const idEncontrado = mapaClubes.get(nombre.trim().toLowerCase());
          if (!idEncontrado) {
            console.warn(`⚠️ Advertencia: no se encontró el club "${nombre}" en la base de datos.`);
          }
          return idEncontrado;
        })
        .filter(Boolean);

      return {
        ...resto,
        clubes: clubesIds,
        usuario: admin._id
      };
    });

    // 4. Limpio torneos previos e inserto los 20 torneos validados por Mongoose
    await Torneo.deleteMany({});
    const insertados = await Torneo.insertMany(torneosListos);

    console.log(`✅ Se cargaron ${insertados.length} torneos de demostración a nombre de ${admin.nombre}.`);
    process.exit(0);
  } catch (error) {
    console.error('❌ Error al cargar torneos:', error.message);
    process.exit(1);
  }
};

cargarTorneos();