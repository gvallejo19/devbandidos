const { DataTypes } = require('sequelize');
const sequelize = require('../database');
const Laboratorio = require('./laboratorio');

const Espacio = sequelize.define('Espacio', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  descripcion: {
    type: DataTypes.TEXT
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
  tableName: 'Espacios',
  timestamps: false
});

module.exports = Espacio;
