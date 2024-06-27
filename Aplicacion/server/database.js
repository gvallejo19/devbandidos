const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('laboratorio', 'postgres', 'Andres21plus.', {
  host: 'localhost',
  dialect: 'postgres'
});

module.exports = sequelize;
