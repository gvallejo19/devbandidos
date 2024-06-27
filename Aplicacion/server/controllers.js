const bcrypt = require('bcrypt');
const Usuario = require('./models/usuario');
const Laboratorio = require('./models/laboratorio');
const Equipo = require('./models/equipo');
const Espacio = require('./models/espacio');
const EquiposEspacios = require('./models/equiposEspacios');
const Reserva = require('./models/reserva');
const HistorialReserva = require('./models/historialReserva');

// Controladores para Usuario
exports.createUsuario = async (data) => {
    const { nombre, email, contraseña, tipo_usuario } = data;
    console.log('Received data for user creation:', data);
    const hashedPassword = await bcrypt.hash(contraseña, 10);
    return await Usuario.create({ nombre, email, contraseña: hashedPassword, tipo_usuario });
};

exports.getUsuarios = async () => await Usuario.findAll();

exports.getUsuarioById = async (id) => await Usuario.findByPk(id);

exports.updateUsuario = async (id, data) => {
    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
        throw new Error('Usuario no encontrado');
    }
    return await usuario.update(data);
};

exports.deleteUsuario = async (id) => {
    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
        throw new Error('Usuario no encontrado');
    }
    await usuario.destroy();
};

exports.authenticateUser = async (email, password) => {
    const usuario = await Usuario.findOne({ where: { email } });
    if (usuario && await bcrypt.compare(password, usuario.contraseña)) {
        return usuario;
    }
    return null;
};

exports.resetPassword = async (email) => {
    const tempPassword = Math.random().toString(36).slice(-8);
    const hashedPassword = await bcrypt.hash(tempPassword, 10);
    await Usuario.update({ contraseña: hashedPassword }, { where: { email } });
    return tempPassword;
};

// Controladores para Laboratorio
exports.createLaboratorio = async (data) => await Laboratorio.create(data);

exports.getLaboratorios = async () => await Laboratorio.findAll();

exports.getLaboratorioById = async (id) => await Laboratorio.findByPk(id);

exports.createLaboratorio = async (data, equipoIds) => {
  try {
    const laboratorio = await Laboratorio.create(data);

    if (equipoIds && equipoIds.length > 0) {
      await associateEquipos(laboratorio.id, equipoIds);
    }

    return laboratorio;
  } catch (error) {
    throw new Error('Error creating laboratorio and associating equipos:', error);
  }
};

// Función para asociar equipos a un laboratorio
const associateEquipos = async (laboratorioId, equipoIds) => {
  const laboratorio = await Laboratorio.findByPk(laboratorioId);
  if (!laboratorio) {
    throw new Error('Laboratorio not found');
  }

  const equipos = await Equipo.findAll({ where: { id: equipoIds } });
  if (equipos.length !== equipoIds.length) {
    throw new Error('One or more equipos not found');
  }

  await laboratorio.setEquipos(equipos); // Asociar equipos al laboratorio
};

exports.updateLaboratorio = async (id, data) => {
    const laboratorio = await Laboratorio.findByPk(id);
    if (!laboratorio) {
        throw new Error('Laboratorio no encontrado');
    }
    return await laboratorio.update(data);
};

exports.deleteLaboratorio = async (id) => {
    const laboratorio = await Laboratorio.findByPk(id);
    if (!laboratorio) {
        throw new Error('Laboratorio no encontrado');
    }
    await laboratorio.destroy();
};

// Controladores para Equipo
exports.createEquipo = async (data) => await Equipo.create(data);

exports.getEquipos = async () => await Equipo.findAll();

exports.getEquipoById = async (id) => await Equipo.findByPk(id);

exports.updateEquipo = async (id, data) => {
    const equipo = await Equipo.findByPk(id);
    if (!equipo) {
        throw new Error('Equipo no encontrado');
    }
    return await equipo.update(data);
};

exports.deleteEquipo = async (id) => {
    const equipo = await Equipo.findByPk(id);
    if (!equipo) {
        throw new Error('Equipo no encontrado');
    }
    await equipo.destroy();
};

// Controladores para Espacio
exports.createEspacio = async (data) => await Espacio.create(data);

exports.getEspacios = async () => await Espacio.findAll();

exports.getEspacioById = async (id) => await Espacio.findByPk(id);

exports.updateEspacio = async (id, data) => {
    const espacio = await Espacio.findByPk(id);
    if (!espacio) {
        throw new Error('Espacio no encontrado');
    }
    return await espacio.update(data);
};

exports.deleteEspacio = async (id) => {
    const espacio = await Espacio.findByPk(id);
    if (!espacio) {
        throw new Error('Espacio no encontrado');
    }
    await espacio.destroy();
};

// Controladores para Reserva
exports.createReserva = async (data) => await Reserva.create(data);

exports.getReservas = async () => await Reserva.findAll();

exports.getReservaById = async (id) => await Reserva.findByPk(id);

exports.updateReserva = async (id, data) => {
    const reserva = await Reserva.findByPk(id);
    if (!reserva) {
        throw new Error('Reserva no encontrada');
    }
    return await reserva.update(data);
};

exports.deleteReserva = async (id) => {
    const reserva = await Reserva.findByPk(id);
    if (!reserva) {
        throw new Error('Reserva no encontrada');
    }
    await reserva.destroy();
};

// Controladores para Historial de Reserva
exports.createHistorialReserva = async (data) => await HistorialReserva.create(data);

exports.getHistorialReservas = async () => await HistorialReserva.findAll();

exports.getHistorialReservaById = async (id) => await HistorialReserva.findByPk(id);

exports.updateHistorialReserva = async (id, data) => {
    const historialReserva = await HistorialReserva.findByPk(id);
    if (!historialReserva) {
        throw new Error('Historial de Reserva no encontrado');
    }
    return await historialReserva.update(data);
};

exports.deleteHistorialReserva = async (id) => {
    const historialReserva = await HistorialReserva.findByPk(id);
    if (!historialReserva) {
        throw new Error('Historial de Reserva no encontrado');
    }
    await historialReserva.destroy();
};

// Controladores para Equipos en Espacios
exports.addEquipoEspacio = async (equipoId, espacioId) => {
    return await EquiposEspacios.create({ equipo_id: equipoId, espacio_id: espacioId });
};

exports.removeEquipoEspacio = async (equipoId, espacioId) => {
    await EquiposEspacios.destroy({ where: { equipo_id: equipoId, espacio_id: espacioId } });
};

exports.getEquiposEnEspacio = async (espacioId) => {
    const equipos = await EquiposEspacios.findAll({ where: { espacio_id: espacioId } });
    return equipos.map(e => e.equipo_id);
};

exports.getEspaciosDeEquipo = async (equipoId) => {
    const espacios = await EquiposEspacios.findAll({ where: { equipo_id: equipoId } });
    return espacios.map(e => e.espacio_id);
};
