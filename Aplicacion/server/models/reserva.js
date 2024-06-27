const { DataTypes } = require('sequelize');
const sequelize = require('../database');
const Usuario = require('./usuario');
const Laboratorio = require('./laboratorio');
const Espacio = require('./espacio');

const Reserva = sequelize.define('Reserva', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  usuario_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Usuario,
      key: 'id'
    },
    onDelete: 'CASCADE'
  },
  laboratorio_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Laboratorio,
      key: 'id'
    },
    onDelete: 'CASCADE'
  },
  espacio_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Espacio,
      key: 'id'
    }
  },
  fecha_reserva: {
    type: DataTypes.DATE,
    allowNull: false
  },
  hora_inicio: {
    type: DataTypes.TIME,
    allowNull: false
  },
  hora_fin: {
    type: DataTypes.TIME,
    allowNull: false
  },
  tipo_reserva: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  estado: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  cantidad_equipos: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  fecha_creacion: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  fecha_modificacion: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'Reservas',
  timestamps: false
});

module.exports = Reserva;
