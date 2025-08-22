
CREATE DATABASE IF NOT EXISTS rrhh;
 
USE rrhh;

-- =========================
-- TABLA: departamentos
-- =========================
CREATE TABLE departamentos (
  id_departamento   INT AUTO_INCREMENT PRIMARY KEY,
  nombre            VARCHAR(120) NOT NULL UNIQUE,
  creado_en         TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  actualizado_en    TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- =========================
-- TABLA: empleados
-- =========================
CREATE TABLE empleados (
  id_empleado         INT AUTO_INCREMENT PRIMARY KEY,
  nombres             VARCHAR(80)  NOT NULL,
  apellidos           VARCHAR(120) NOT NULL,
  identificacion      VARCHAR(50)  NOT NULL UNIQUE,     
  correo              VARCHAR(255) NOT NULL UNIQUE,
  telefono            VARCHAR(40),
  fecha_nacimiento    DATE,
  genero              ENUM('F','M') DEFAULT NULL,
  fecha_contratacion  DATE NOT NULL,
  puesto              VARCHAR(120) NOT NULL,
  estado_empleo       ENUM('ACTIVO','SUSPENDIDO','TERMINADO') NOT NULL DEFAULT 'ACTIVO',
  salario             DECIMAL(12,2) NOT NULL CHECK (salario >= 0),
  direccion1          VARCHAR(200),
  direccion2          VARCHAR(200),
  ciudad              VARCHAR(120),
  region_estado       VARCHAR(120),
  pais                VARCHAR(120),
  codigo_postal       VARCHAR(20),
  contacto_emergencia_nombre  VARCHAR(160),
  contacto_emergencia_telefono VARCHAR(40),
  cuenta_bancaria_iban        VARCHAR(50),
  id_jefe            INT NULL,
  id_departamento    INT NULL,
  creado_en          TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  actualizado_en     TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_emp_jefe       FOREIGN KEY (id_jefe)        REFERENCES empleados(id_empleado) ON DELETE SET NULL,
  CONSTRAINT fk_emp_departamento FOREIGN KEY (id_departamento) REFERENCES departamentos(id_departamento) ON DELETE SET NULL
) ENGINE=InnoDB;

CREATE INDEX idx_empleados_nombre ON empleados(apellidos, nombres);
CREATE INDEX idx_empleados_depto ON empleados(id_departamento);

-- =========================
-- TABLA: proyectos
-- =========================
CREATE TABLE proyectos (
  id_proyecto        INT AUTO_INCREMENT PRIMARY KEY,
  nombre             VARCHAR(160) NOT NULL UNIQUE,
  descripcion        TEXT,
  fecha_inicio       DATE NOT NULL,
  fecha_fin          DATE NULL,
  porcentaje_avance  DECIMAL(5,2) NOT NULL DEFAULT 0
                        CHECK (porcentaje_avance >= 0 AND porcentaje_avance <= 100),
  estado             ENUM('PLANIFICADO','EN_PROGRESO','EN_PAUSA','COMPLETADO','CANCELADO')
                        NOT NULL DEFAULT 'PLANIFICADO',
  presupuesto        DECIMAL(14,2) DEFAULT NULL CHECK (presupuesto IS NULL OR presupuesto >= 0),
  creado_en          TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  actualizado_en     TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CHECK (fecha_fin IS NULL OR fecha_fin >= fecha_inicio)
) ENGINE=InnoDB;

CREATE INDEX idx_proyectos_fechas ON proyectos(fecha_inicio, fecha_fin);

-- =========================
-- TABLA: asignaciones_empleado_proyecto
-- =========================
CREATE TABLE asignaciones_empleado_proyecto (
  id_asignacion   INT AUTO_INCREMENT PRIMARY KEY,
  id_empleado     INT NOT NULL,
  id_proyecto     INT NOT NULL,
  rol             VARCHAR(120) NOT NULL,           -- p.ej. "Desarrollador", "PM"
  porcentaje_asignacion  TINYINT NOT NULL DEFAULT 100 CHECK (porcentaje_asignacion BETWEEN 1 AND 100),
  fecha_asignacion       DATE NOT NULL,
  fecha_liberacion       DATE NULL,                -- NULL = asignación activa
  activa_flag     TINYINT GENERATED ALWAYS AS (CASE WHEN fecha_liberacion IS NULL THEN 1 ELSE NULL END) VIRTUAL,
  creado_en       TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
  actualizado_en  TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT fk_asig_empleado FOREIGN KEY (id_empleado) REFERENCES empleados(id_empleado) ON DELETE CASCADE,
  CONSTRAINT fk_asig_proyecto FOREIGN KEY (id_proyecto) REFERENCES proyectos(id_proyecto) ON DELETE CASCADE,
  CHECK (fecha_liberacion IS NULL OR fecha_liberacion >= fecha_asignacion)
) ENGINE=InnoDB;


CREATE UNIQUE INDEX uq_empleado_unico_activo ON asignaciones_empleado_proyecto(id_empleado, activa_flag);


CREATE INDEX idx_asig_emp ON asignaciones_empleado_proyecto(id_empleado);
CREATE INDEX idx_asig_proy ON asignaciones_empleado_proyecto(id_proyecto);
CREATE INDEX idx_asig_fechas ON asignaciones_empleado_proyecto(fecha_asignacion, fecha_liberacion);


-- =========================
-- DATOS DE EJEMPLO
-- =========================
INSERT INTO departamentos (nombre) VALUES ('Ingeniería'), ('Operaciones');

INSERT INTO empleados
  (nombres,apellidos,identificacion,correo,telefono,fecha_nacimiento,fecha_contratacion,puesto,estado_empleo,salario,id_departamento)
VALUES
  ('Ana','López','ID-001','ana.lopez@empresa.com','+50211111111','1990-05-10','2020-01-15','Desarrollador Backend','ACTIVO',12000,1),
  ('Luis','Martínez','ID-002','luis.martinez@empresa.com','+50222222222','1988-11-20','2019-03-01','Gerente de Proyecto','ACTIVO',18000,1);

INSERT INTO proyectos (nombre, descripcion, fecha_inicio, fecha_fin, porcentaje_avance, estado, presupuesto)
VALUES
  ('Intranet 2.0','Rediseño de la intranet corporativa','2025-01-01',NULL,25.00,'EN_PROGRESO',250000);

INSERT INTO asignaciones_empleado_proyecto (id_empleado, id_proyecto, rol, porcentaje_asignacion, fecha_asignacion)
VALUES
  (1, 1, 'Desarrollador Backend', 100, '2025-02-01'),
  (2, 1, 'Gerente de Proyecto',   100, '2025-02-01');
