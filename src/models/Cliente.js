const mongoose = require('mongoose');

const esquemaCliente = new mongoose.Schema({
  nombre: { type: String, required: true },
  correo: { type: String, required: true, unique: true },
  telefono: { type: String }
});

module.exports = mongoose.model('Cliente', esquemaCliente);