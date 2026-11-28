
import mongoose from 'mongoose';
import dns from 'dns/promises'; //  Importo el módulo DNS

//  Forzar a Node a usar los DNS de Google (o Cloudflare)
dns.setServers(['8.8.8.8', '1.1.1.1']);

export const connectDB = async () => {


  try {
    // Usamos la URL que viene desde el archivo .env
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB conectado correctamente');
  } catch (error) {
    console.error('❌ Error al conectar MongoDB:', error.message);
    // Si falla la conexión, cerramos el proceso para que no quede colgado
    process.exit(1); 
  }



  
};