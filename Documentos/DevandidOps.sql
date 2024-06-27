CREATE TABLE "Usuarios" (
  "id" SERIAL PRIMARY KEY,
  "nombre" VARCHAR(100) NOT NULL,
  "email" VARCHAR(100) UNIQUE NOT NULL,
  "contraseña" VARCHAR(100) NOT NULL,
  "tipo_usuario" VARCHAR(50) NOT NULL,
  "fecha_registro" TIMESTAMP DEFAULT (CURRENT_TIMESTAMP)
);

CREATE TABLE "Laboratorios" (
  "id" SERIAL PRIMARY KEY,
  "nombre" VARCHAR(100) UNIQUE NOT NULL,
  "capacidad" INT NOT NULL,
  "ubicacion" VARCHAR(255) NOT NULL,
  "descripcion" TEXT
);

CREATE TABLE "Equipos" (
  "id" SERIAL PRIMARY KEY,
  "nombre" VARCHAR(100) NOT NULL,
  "tipo" VARCHAR(100) NOT NULL,
  "laboratorio_id" INT
);

CREATE TABLE "Espacios" (
  "id" SERIAL PRIMARY KEY,
  "nombre" VARCHAR(100) NOT NULL,
  "descripcion" TEXT,
  "laboratorio_id" INT
);

CREATE TABLE "EquiposEspacios" (
  "equipo_id" INT,
  "espacio_id" INT,
  PRIMARY KEY ("equipo_id", "espacio_id")
);

CREATE TABLE "Reservas" (
  "id" SERIAL PRIMARY KEY,
  "usuario_id" INT,
  "laboratorio_id" INT,
  "espacio_id" INT,
  "fecha_reserva" DATE NOT NULL,
  "hora_inicio" TIME NOT NULL,
  "hora_fin" TIME NOT NULL,
  "tipo_reserva" VARCHAR(50) NOT NULL,
  "estado" VARCHAR(50) NOT NULL,
  "cantidad_equipos" INT NOT NULL,
  "fecha_creacion" TIMESTAMP DEFAULT (CURRENT_TIMESTAMP),
  "fecha_modificacion" TIMESTAMP DEFAULT (CURRENT_TIMESTAMP)
);

CREATE TABLE "HistorialReservas" (
  "id" SERIAL PRIMARY KEY,
  "reserva_id" INT,
  "usuario_id" INT,
  "laboratorio_id" INT,
  "fecha_reserva" DATE NOT NULL,
  "hora_inicio" TIME NOT NULL,
  "hora_fin" TIME NOT NULL,
  "tipo_reserva" VARCHAR(50) NOT NULL,
  "accion" VARCHAR(50) NOT NULL,
  "fecha_accion" TIMESTAMP DEFAULT (CURRENT_TIMESTAMP)
);

ALTER TABLE "Equipos" ADD FOREIGN KEY ("laboratorio_id") REFERENCES "Laboratorios" ("id") ON DELETE CASCADE;

ALTER TABLE "Espacios" ADD FOREIGN KEY ("laboratorio_id") REFERENCES "Laboratorios" ("id") ON DELETE CASCADE;

ALTER TABLE "EquiposEspacios" ADD FOREIGN KEY ("equipo_id") REFERENCES "Equipos" ("id") ON DELETE CASCADE;

ALTER TABLE "EquiposEspacios" ADD FOREIGN KEY ("espacio_id") REFERENCES "Espacios" ("id") ON DELETE CASCADE;

ALTER TABLE "Reservas" ADD FOREIGN KEY ("usuario_id") REFERENCES "Usuarios" ("id") ON DELETE CASCADE;

ALTER TABLE "Reservas" ADD FOREIGN KEY ("laboratorio_id") REFERENCES "Laboratorios" ("id") ON DELETE CASCADE;

ALTER TABLE "Reservas" ADD FOREIGN KEY ("espacio_id") REFERENCES "Espacios" ("id");

ALTER TABLE "HistorialReservas" ADD FOREIGN KEY ("reserva_id") REFERENCES "Reservas" ("id") ON DELETE CASCADE;

ALTER TABLE "HistorialReservas" ADD FOREIGN KEY ("usuario_id") REFERENCES "Usuarios" ("id") ON DELETE CASCADE;

ALTER TABLE "HistorialReservas" ADD FOREIGN KEY ("laboratorio_id") REFERENCES "Laboratorios" ("id") ON DELETE CASCADE;
