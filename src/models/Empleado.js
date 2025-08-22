import pool from "../config/db.js";

class Empleado {
  static async findAll() {
    const [rows] = await pool.query("SELECT * FROM empleados");
    return rows;
  }

  static async findById(id) {
    const [rows] = await pool.query("SELECT * FROM empleados WHERE id_empleado = ?", [id]);
    return rows[0];
  }

  static async create(data) {
    const {
      nombres,
      apellidos,
      identificacion,
      correo,
      telefono,
      fecha_nacimiento,
      genero,
      fecha_contratacion,
      puesto,
      estado_empleo,
      salario,
      direccion1,
      direccion2,
      ciudad,
      region_estado,
      pais,
      codigo_postal,
      contacto_emergencia_nombre,
      contacto_emergencia_telefono,
      cuenta_bancaria_iban,
      id_jefe,
      id_departamento
    } = data;

    const [result] = await pool.query(
      `INSERT INTO empleados (
        nombres, apellidos, identificacion, correo, telefono, fecha_nacimiento, genero,
        fecha_contratacion, puesto, estado_empleo, salario,
        direccion1, direccion2, ciudad, region_estado, pais, codigo_postal,
        contacto_emergencia_nombre, contacto_emergencia_telefono, cuenta_bancaria_iban,
        id_jefe, id_departamento
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        nombres, apellidos, identificacion, correo, telefono, fecha_nacimiento, genero,
        fecha_contratacion, puesto, estado_empleo, salario,
        direccion1, direccion2, ciudad, region_estado, pais, codigo_postal,
        contacto_emergencia_nombre, contacto_emergencia_telefono, cuenta_bancaria_iban,
        id_jefe, id_departamento
      ]
    );

    return result.insertId;
  }

  static async update(id, data) {
    const {
      nombres,
      apellidos,
      identificacion,
      correo,
      telefono,
      fecha_nacimiento,
      genero,
      fecha_contratacion,
      puesto,
      estado_empleo,
      salario,
      direccion1,
      direccion2,
      ciudad,
      region_estado,
      pais,
      codigo_postal,
      contacto_emergencia_nombre,
      contacto_emergencia_telefono,
      cuenta_bancaria_iban,
      id_jefe,
      id_departamento
    } = data;

    const [result] = await pool.query(
      `UPDATE empleados SET
        nombres=?, apellidos=?, identificacion=?, correo=?, telefono=?, fecha_nacimiento=?, genero=?,
        fecha_contratacion=?, puesto=?, estado_empleo=?, salario=?,
        direccion1=?, direccion2=?, ciudad=?, region_estado=?, pais=?, codigo_postal=?,
        contacto_emergencia_nombre=?, contacto_emergencia_telefono=?, cuenta_bancaria_iban=?,
        id_jefe=?, id_departamento=?
       WHERE id_empleado=?`,
      [
        nombres, apellidos, identificacion, correo, telefono, fecha_nacimiento, genero,
        fecha_contratacion, puesto, estado_empleo, salario,
        direccion1, direccion2, ciudad, region_estado, pais, codigo_postal,
        contacto_emergencia_nombre, contacto_emergencia_telefono, cuenta_bancaria_iban,
        id_jefe, id_departamento, id
      ]
    );

    return result.affectedRows;
  }

  static async delete(id) {
    const [result] = await pool.query("DELETE FROM empleados WHERE id_empleado = ?", [id]);
    return result.affectedRows;
  }
}

export default Empleado;
