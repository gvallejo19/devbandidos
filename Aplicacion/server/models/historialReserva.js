const { DataTypes } = require('sequelize');
const sequelize = require('../database');
const Reserva = require('./reserva');
const Usuario = require('./usuario');
const Laboratorio = require('./laboratorio');

const HistorialReserva = sequelize.define('HistorialReserva', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  reserva_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Reserva,
      key: 'id'
    },
    onDelete: 'CASCADE'
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
  accion: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  fecha_accion: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'HistorialReservas',
  timestamps: false
});

module.exports = HistorialReserva;
