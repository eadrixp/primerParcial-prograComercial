import Asignacion from "../models/AsignacionEmpleados.js";

export const getAsignaciones = async (req, res) => {
  try {
    const asignaciones = await Asignacion.findAll();
    res.json(asignaciones);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getAsignacionById = async (req, res) => {
  try {
    const asignacion = await Asignacion.findById(req.params.id);
    if (!asignacion) return res.status(404).json({ message: "Asignación no encontrada" });
    res.json(asignacion);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createAsignacion = async (req, res) => {
  try {
    const id = await Asignacion.create(req.body);
    res.status(201).json({ id, ...req.body });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const updateAsignacion = async (req, res) => {
  try {
    const rows = await Asignacion.update(req.params.id, req.body);
    if (!rows) return res.status(404).json({ message: "Asignación no encontrada" });
    res.json({ message: "Asignación actualizada correctamente" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
