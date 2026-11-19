import * as torneoService from '../services/torneoService.js';

export const create = async (req, res) => {
  try {
    const torneo = await torneoService.createTorneo(req.body, req.user.id);
    res.status(201).json(torneo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getAll = async (req, res) => {
  try {
    const torneos = await torneoService.getTorneos(req.query);
    res.json(torneos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getOne = async (req, res) => {
  try {
    const torneo = await torneoService.getTorneoById(req.params.id);
    res.json(torneo);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

export const update = async (req, res) => {
  try {
    const torneo = await torneoService.updateTorneo(req.params.id, req.body, req.user);
    res.json(torneo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const remove = async (req, res) => {
  try {
    await torneoService.deleteTorneo(req.params.id, req.user);
    res.json({ mensaje: 'Torneo eliminado correctamente' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};