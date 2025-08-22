import { Router } from "express";
import { getProyectos, getProyectoById, createProyecto, updateProyecto } from "../controllers/proyectoController.js";

const router = Router();

router.get("/listar", getProyectos);
router.get("/BuscarPorId/:id", getProyectoById);
router.post("/crear", createProyecto);
router.put("/editar/:id", updateProyecto);

export default router;
