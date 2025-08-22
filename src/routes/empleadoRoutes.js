import { Router } from "express";
import { getEmpleados, getEmpleadoById, createEmpleado, updateEmpleado, deleteEmpleado } from "../controllers/empleadoController.js";

const router = Router();

router.get("/listar", getEmpleados);
router.get("/buscarPorId/:id", getEmpleadoById);
router.post("/crear", createEmpleado);
router.put("/actualizar/:id", updateEmpleado);
router.delete("/eliminar/:id", deleteEmpleado);

export default router;
