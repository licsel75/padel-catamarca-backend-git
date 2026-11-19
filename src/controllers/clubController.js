import * as clubService from '../services/clubService.js';

export const create = async (req, res) => {
  try {
    // Pasamos req.user completo para verificar rol y límite de 5 clubes
    const club = await clubService.createClub(req.body, req.user);
    res.status(201).json(club);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getAll = async (req, res) => {
  try {
    const clubes = await clubService.getClubes();
    res.json(clubes);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getOne = async (req, res) => {
  try {
    const club = await clubService.getClubById(req.params.id);
    res.json(club);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

export const update = async (req, res) => {
  try {
    const club = await clubService.updateClub(req.params.id, req.body, req.user);
    res.json(club);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const remove = async (req, res) => {
  try {
    await clubService.deleteClub(req.params.id, req.user);
    res.json({ mensaje: 'Club eliminado correctamente' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};