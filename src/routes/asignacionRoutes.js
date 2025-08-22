import { Router } from "express";
import { getAsignaciones, getAsignacionById, createAsignacion, updateAsignacion } from "../controllers/asignacionController.js";

const router = Router();

router.get("/listar", getAsignaciones);
router.get("/BuscarPorId/:id", getAsignacionById);
router.post("/crear", createAsignacion);
router.put("/editar/:id", updateAsignacion);

export default router;
