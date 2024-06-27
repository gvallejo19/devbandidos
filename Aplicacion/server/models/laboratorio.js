const { DataTypes } = require('sequelize');
const sequelize = require('../database');

const Laboratorio = sequelize.define('Laboratorio', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true
  },
  capacidad: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  ubicacion: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  descripcion: {
    type: DataTypes.TEXT
  }
}, {
  tableName: 'Laboratorios',
  timestamps: false
});

module.exports = Laboratorio;
