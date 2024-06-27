const { DataTypes } = require('sequelize');
const sequelize = require('../database'); // Importa la configuración de Sequelize

const Usuario = sequelize.define('Usuario', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  email: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true
  },
  contraseña: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  tipo_usuario: {
    type: DataTypes.STRING(50),
    allowNull: false
  },
  fecha_registro: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'Usuarios',
  timestamps: false
});

module.exports = Usuario;
