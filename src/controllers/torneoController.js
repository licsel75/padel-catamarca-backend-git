import * as torneoService from '../services/torneoService.js';

// Mantengo mis controladores delgados ("Thin Controllers"): su única responsabilidad es traducir
// la petición HTTP (extraer req.body, req.params, req.query, req.user) y devolver la respuesta con el código de estado adecuado,
// delegando toda la lógica de negocio y acceso a MongoDB a la capa de servicios.





export const create = async (req, res) => {
  try {
    // Paso el cuerpo ya validado por el middleware y el ID del usuario autenticado (inyectado por 'protect')
    const torneo = await torneoService.createTorneo(req.body, req.user.id);
    // Respondo con 201 (Created) siguiendo la convención REST para creación de recursos
    res.status(201).json(torneo);
  } catch (error) {
    // Si falla una regla de negocio en el servicio (ej: fechas inválidas o club inexistente), devuelvo 400 (Bad Request)
    res.status(400).json({ error: error.message });
  }
};








export const getAll = async (req, res) => {
  try {
    // Le paso req.query completo al servicio para soportar filtros dinámicos desde la URL (ej: ?estado=abierto&categoria=M4ta)
    const torneos = await torneoService.getTorneos(req.query);
    // Por defecto Express envía estado 200 OK
    res.json(torneos);
  } catch (error) {
    // Un fallo al listar suele indicar un problema interno de base de datos o servidor, por eso uso 500
    res.status(500).json({ error: error.message });
  }
};

export const getOne = async (req, res) => {
  try {
    // Extraigo el parámetro dinámico ':id' de la ruta y busco el recurso puntual
    const torneo = await torneoService.getTorneoById(req.params.id);
    res.json(torneo);
  } catch (error) {
    // Si el servicio lanza error porque el ID no existe, respondo con 404 (Not Found)
    res.status(404).json({ error: error.message });
  }
};

export const update = async (req, res) => {
  try {
    // Aquí paso el objeto 'req.user' completo (con id y rol) porque el servicio necesita verificar
    // no solo qué rol tiene, sino si es el dueño del torneo o un admin (control de propiedad / ownership)
    const torneo = await torneoService.updateTorneo(req.params.id, req.body, req.user);
    res.json(torneo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const remove = async (req, res) => {
  try {
    // Al igual que en update, envío 'req.user' completo para que el servicio valide permisos de propiedad antes de borrar
    await torneoService.deleteTorneo(req.params.id, req.user);
    res.json({ mensaje: 'Torneo eliminado correctamente' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};