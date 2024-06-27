const sequelize = require('./database');
const Usuario = require('./models/usuario');
const Laboratorio = require('./models/laboratorio');
const Equipo = require('./models/equipo');
const Espacio = require('./models/espacio');
const EquiposEspacios = require('./models/equiposEspacios');
const Reserva = require('./models/reserva');
const HistorialReserva = require('./models/historialReserva');

// Definir las relaciones
Usuario.hasMany(Reserva, { foreignKey: 'usuario_id' });
Laboratorio.hasMany(Reserva, { foreignKey: 'laboratorio_id' });
Laboratorio.hasMany(Equipo, { foreignKey: 'laboratorio_id' });
Laboratorio.hasMany(Espacio, { foreignKey: 'laboratorio_id' });
Espacio.belongsTo(Laboratorio, { foreignKey: 'laboratorio_id' });
Equipo.belongsTo(Laboratorio, { foreignKey: 'laboratorio_id' });
Reserva.belongsTo(Usuario, { foreignKey: 'usuario_id' });
Reserva.belongsTo(Laboratorio, { foreignKey: 'laboratorio_id' });
Reserva.belongsTo(Espacio, { foreignKey: 'espacio_id' });
HistorialReserva.belongsTo(Reserva, { foreignKey: 'reserva_id' });
HistorialReserva.belongsTo(Usuario, { foreignKey: 'usuario_id' });
HistorialReserva.belongsTo(Laboratorio, { foreignKey: 'laboratorio_id' });

Equipo.belongsToMany(Espacio, { through: EquiposEspacios, foreignKey: 'equipo_id' });
Espacio.belongsToMany(Equipo, { through: EquiposEspacios, foreignKey: 'espacio_id' });

// Sincronizar los modelos con la base de datos
sequelize.sync({ force: true }).then(() => {
  console.log('Tablas creadas exitosamente');
}).catch(error => {
  console.error('Error al crear las tablas:', error);
});

module.exports = {
  Usuario,
  Laboratorio,
  Equipo,
  Espacio,
  EquiposEspacios,
  Reserva,
  HistorialReserva
};
