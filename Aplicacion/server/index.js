const express = require('express');
const cors = require('cors');
const sequelize = require('./database');
const controllers = require('./controllers');
//onst { sendPasswordResetEmail } = require('./emailService'); // Importa el servicio de correo

const app = express();
app.use(cors());
app.use(express.json());

// Conectar a la base de datos
sequelize.authenticate()
    .then(() => console.log('Database connected...'))
    .catch(err => console.log('Error: ' + err));

// Sincronizar los modelos con la base de datos
sequelize.sync()
    .then(() => console.log('Models synchronized...'))
    .catch(err => console.log('Error: ' + err));

// Rutas para 'Usuarios'
app.post('/usuarios', async (req, res) => {
    try {
        const usuario = await controllers.createUsuario(req.body);
        res.status(201).json(usuario);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.get('/usuarios', async (req, res) => {
    try {
        const usuarios = await controllers.getUsuarios();
        res.status(200).json(usuarios);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.put('/usuarios/:id', async (req, res) => {
    try {
        const updated = await controllers.updateUsuario(req.params.id, req.body);
        res.status(200).json(updated);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.delete('/usuarios/:id', async (req, res) => {
    try {
        await controllers.deleteUsuario(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Rutas para 'Laboratorios'
app.post('/laboratorios', async (req, res) => {
    try {
        const laboratorio = await controllers.createLaboratorio(req.body);
        res.status(201).json(laboratorio);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.get('/laboratorios', async (req, res) => {
    try {
        const laboratorios = await controllers.getLaboratorios();
        res.status(200).json(laboratorios);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.put('/laboratorios/:id', async (req, res) => {
    try {
        const updated = await controllers.updateLaboratorio(req.params.id, req.body);
        res.status(200).json(updated);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.delete('/laboratorios/:id', async (req, res) => {
    try {
        await controllers.deleteLaboratorio(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Rutas para 'Equipos'
app.post('/equipos', async (req, res) => {
    try {
        const equipo = await controllers.createEquipo(req.body);
        res.status(201).json(equipo);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.get('/equipos', async (req, res) => {
    try {
        const equipos = await controllers.getEquipos();
        res.status(200).json(equipos);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.put('/equipos/:id', async (req, res) => {
    try {
        const updated = await controllers.updateEquipo(req.params.id, req.body);
        res.status(200).json(updated);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.delete('/equipos/:id', async (req, res) => {
    try {
        await controllers.deleteEquipo(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Rutas para 'Espacios'
app.post('/espacios', async (req, res) => {
    try {
        const espacio = await controllers.createEspacio(req.body);
        res.status(201).json(espacio);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.get('/espacios', async (req, res) => {
    try {
        const espacios = await controllers.getEspacios();
        res.status(200).json(espacios);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.put('/espacios/:id', async (req, res) => {
    try {
        const updated = await controllers.updateEspacio(req.params.id, req.body);
        res.status(200).json(updated);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.delete('/espacios/:id', async (req, res) => {
    try {
        await controllers.deleteEspacio(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Rutas para 'Reservas'
app.post('/reservas', async (req, res) => {
    try {
        const reserva = await controllers.createReserva(req.body);
        res.status(201).json(reserva);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.get('/reservas', async (req, res) => {
    try {
        const reservas = await controllers.getReservas();
        res.status(200).json(reservas);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.put('/reservas/:id', async (req, res) => {
    try {
        const updated = await controllers.updateReserva(req.params.id, req.body);
        res.status(200).json(updated);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.delete('/reservas/:id', async (req, res) => {
    try {
        await controllers.deleteReserva(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Rutas para 'HistorialReservas'
app.post('/historial-reservas', async (req, res) => {
    try {
        const historialReserva = await controllers.createHistorialReserva(req.body);
        res.status(201).json(historialReserva);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.get('/historial-reservas', async (req, res) => {
    try {
        const historialesReserva = await controllers.getHistorialReservas();
        res.status(200).json(historialesReserva);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.put('/historial-reservas/:id', async (req, res) => {
    try {
        const updated = await controllers.updateHistorialReserva(req.params.id, req.body);
        res.status(200).json(updated);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

app.delete('/historial-reservas/:id', async (req, res) => {
    try {
        await controllers.deleteHistorialReserva(req.params.id);
        res.status(204).send();
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Rutas adicionales

// Ruta para recuperar contraseña
app.post('/usuarios/reset-password', async (req, res) => {
    const { email } = req.body;
    try {
        const tempPassword = await controllers.resetPassword(email);
        await sendPasswordResetEmail(email, tempPassword);
        res.status(200).json({ message: 'Se ha enviado una contraseña temporal a tu correo electrónico.' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Ruta para autenticación de usuarios
app.post('/usuarios/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await controllers.authenticateUser(email, password);
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(401).json({ message: 'Credenciales inválidas' });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 3307;
app.listen(PORT, () => {
    console.log(`Corriendo en el puerto ${PORT}`);
});
