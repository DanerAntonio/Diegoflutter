require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./src/routes/auth');
const clientRoutes = require('./src/routes/clients');
const purchaseRoutes = require('./src/routes/purchases');

const app = express();

app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.error('Error conectando a MongoDB', err));

app.use('/api/auth', authRoutes);
app.use('/api/clients', clientRoutes);
app.use('/api/purchases', purchaseRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto ${PORT}`));