import pool from "../config/db.js";

class AsignacionEmpleados {
  static async findAll() {
    const [rows] = await pool.query(
      `SELECT a.id_asignacion, a.id_empleado, e.nombres, e.apellidos, 
              a.id_proyecto, p.nombre AS nombre_proyecto, 
              a.rol, a.porcentaje_asignacion, a.fecha_asignacion, a.fecha_liberacion
       FROM asignaciones_empleado_proyecto a
       JOIN empleados e ON a.id_empleado = e.id_empleado
       JOIN proyectos p ON a.id_proyecto = p.id_proyecto`
    );
    return rows;
  }

  static async findById(id) {
    const [rows] = await pool.query(
      `SELECT * FROM asignaciones_empleado_proyecto WHERE id_asignacion = ?`,
      [id]
    );
    return rows[0];
  }

  static async create(data) {
    const { id_empleado, id_proyecto, rol, porcentaje_asignacion, fecha_asignacion } = data;


    const [existe] = await pool.query(
      `SELECT * FROM asignaciones_empleado_proyecto 
       WHERE id_empleado = ? AND fecha_liberacion IS NULL`,
      [id_empleado]
    );
    if (existe.length > 0) {
      throw new Error("El empleado ya tiene una asignación activa.");
    }

    const [result] = await pool.query(
      `INSERT INTO asignaciones_empleado_proyecto (id_empleado, id_proyecto, rol, porcentaje_asignacion, fecha_asignacion)
       VALUES (?, ?, ?, ?, ?)`,
      [id_empleado, id_proyecto, rol, porcentaje_asignacion, fecha_asignacion]
    );

    return result.insertId;
  }

  static async update(id, data) {
    const { rol, porcentaje_asignacion, fecha_liberacion } = data;
    const [result] = await pool.query(
      `UPDATE asignaciones_empleado_proyecto 
       SET rol=?, porcentaje_asignacion=?, fecha_liberacion=? 
       WHERE id_asignacion=?`,
      [rol, porcentaje_asignacion, fecha_liberacion, id]
    );
    return result.affectedRows;
  }
}

export default AsignacionEmpleados;
