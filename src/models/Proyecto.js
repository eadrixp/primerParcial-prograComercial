import pool from "../config/db.js";

class Proyecto {
  static async findAll() {
    const [rows] = await pool.query("SELECT * FROM proyectos");
    return rows;
  }

  static async findById(id) {
    const [rows] = await pool.query("SELECT * FROM proyectos WHERE id_proyecto = ?", [id]);
    return rows[0];
  }

  static async create(data) {
    const { nombre, descripcion, fecha_inicio, fecha_fin, porcentaje_avance, estado, presupuesto } = data;
    const [result] = await pool.query(
      `INSERT INTO proyectos (nombre, descripcion, fecha_inicio, fecha_fin, porcentaje_avance, estado, presupuesto) 
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [nombre, descripcion, fecha_inicio, fecha_fin, porcentaje_avance, estado, presupuesto]
    );
    return result.insertId;
  }

  static async update(id, data) {
    const { nombre, descripcion, fecha_inicio, fecha_fin, porcentaje_avance, estado, presupuesto } = data;
    const [result] = await pool.query(
      `UPDATE proyectos SET nombre=?, descripcion=?, fecha_inicio=?, fecha_fin=?, porcentaje_avance=?, estado=?, presupuesto=? 
       WHERE id_proyecto=?`,
      [nombre, descripcion, fecha_inicio, fecha_fin, porcentaje_avance, estado, presupuesto, id]
    );
    return result.affectedRows;
  }
}

export default Proyecto;
