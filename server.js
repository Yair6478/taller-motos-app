const express = require('express');
const { Client } = require('pg');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

// Configuración de la conexión a la base de datos
const client = new Client({
    user: 'yair6478',
    host: 'localhost',
    database: 'taller_motos',
    password: 'jorge1964',
    port: 5432,
});

client.connect();

app.use(cors());
app.use(bodyParser.json());

// Configurar el middleware express.static para servir archivos estáticos
app.use(express.static('C:/Users/USUARIO/OneDrive/Desktop/DiseñoFrontend'));

app.post('/agendar-cita', (req, res) => {
    const { nombre, email, telefono, fecha, hora, mensaje } = req.body;

    // Insertar los datos de la cita en la base de datos
    client.query(
        'INSERT INTO citas (nombre, email, telefono, fecha, hora, mensaje) VALUES ($1, $2, $3, $4, $5, $6)',
        [nombre, email, telefono, fecha, hora, mensaje],
        (err, result) => {
            if (err) {
                console.error('Error al agendar la cita:', err);
                res.status(500).json({ success: false, error: err.message });
            } else {
                res.json({ success: true });
            }
        }
    );
});

app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});