import Proyecto from "../models/Proyecto.js";

export const getProyectos = async (req, res) => {
  try {
    const proyectos = await Proyecto.findAll();
    res.json(proyectos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getProyectoById = async (req, res) => {
  try {
    const proyecto = await Proyecto.findById(req.params.id);
    if (!proyecto) return res.status(404).json({ message: "Proyecto no encontrado" });
    res.json(proyecto);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createProyecto = async (req, res) => {
  try {
    const id = await Proyecto.create(req.body);
    res.status(201).json({ id, ...req.body });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const updateProyecto = async (req, res) => {
  try {
    const rows = await Proyecto.update(req.params.id, req.body);
    if (!rows) return res.status(404).json({ message: "Proyecto no encontrado" });
    res.json({ message: "Proyecto actualizado correctamente" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
