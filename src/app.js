const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

// Middleware
app.use(express.json());

// Conexión a la base de datos
mongoose.connect(process.env.MONGODB_URI, {

  //useNewUrlParser: true,
 // useUnifiedTopology: true,
})
.then(() => console.log('Conectado a MongoDB'))
.catch((err) => console.error('Error de conexión a MongoDB:', err));

// Rutas
app.use('/api/autenticacion', require('./routes/autenticacion'));
app.use('/api/clientes', require('./routes/clientes'));
app.use('/api/compras', require('./routes/compras'));

const PUERTO = process.env.PORT || 3000;
app.listen(PUERTO, () => console.log(`Servidor corriendo en el puerto ${PUERTO}`));