const { DataTypes } = require('sequelize');
const sequelize = require('../database');
const Laboratorio = require('./laboratorio'); // Importa el modelo relacionado

const Equipo = sequelize.define('Equipo', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  tipo: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  laboratorio_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Laboratorio,
      key: 'id'
    },
    onDelete: 'CASCADE'
  }
}, {
  tableName: 'Equipos',
  timestamps: false
});

module.exports = Equipo;
