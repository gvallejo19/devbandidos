const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('laboratorio', 'postgres', '160047194-8', {
  host: 'localhost',
  dialect: 'postgres'
});

module.exports = sequelize;
