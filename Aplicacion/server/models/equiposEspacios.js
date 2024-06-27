const { DataTypes } = require('sequelize');
const sequelize = require('../database');
const Equipo = require('./equipo');
const Espacio = require('./espacio');

const EquiposEspacios = sequelize.define('EquiposEspacios', {
  equipo_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Equipo,
      key: 'id'
    },
    onDelete: 'CASCADE',
    primaryKey: true
  },
  espacio_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Espacio,
      key: 'id'
    },
    onDelete: 'CASCADE',
    primaryKey: true
  }
}, {
  tableName: 'EquiposEspacios',
  timestamps: false
});

module.exports = EquiposEspacios;
