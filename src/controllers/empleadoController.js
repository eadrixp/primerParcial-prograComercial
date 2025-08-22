import Empleado from "../models/Empleado.js";

export const getEmpleados = async (req, res) => {
  try {
    const empleados = await Empleado.findAll();
    res.json(empleados);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getEmpleadoById = async (req, res) => {
  try {
    const empleado = await Empleado.findById(req.params.id);
    if (!empleado) return res.status(404).json({ message: "Empleado no encontrado" });
    res.json(empleado);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const createEmpleado = async (req, res) => {
  try {
    const id = await Empleado.create(req.body); 
    res.status(201).json({ id, ...req.body });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const updateEmpleado = async (req, res) => {
  try {
    const rows = await Empleado.update(req.params.id, req.body);
    if (!rows) return res.status(404).json({ message: "Empleado no encontrado" });
    res.json({ message: "Empleado actualizado correctamente" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

export const deleteEmpleado = async (req, res) => {
  try {
    const rows = await Empleado.delete(req.params.id);
    if (!rows) return res.status(404).json({ message: "Empleado no encontrado" });
    res.json({ message: "Empleado eliminado correctamente" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
