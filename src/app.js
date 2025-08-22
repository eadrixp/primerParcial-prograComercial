import express from "express";
import empleadoRoutes from "./routes/empleadoRoutes.js";
import proyectoRoutes from "./routes/proyectoRoutes.js";
import asignacionRoutes from "./routes/asignacionRoutes.js";
const app = express();

app.use(express.json());


app.use("/empleados", empleadoRoutes);
app.use("/proyectos", proyectoRoutes);
app.use("/asignacion", asignacionRoutes);
export default app;
