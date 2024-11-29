const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const esquemaUsuario = new mongoose.Schema({
  nombreUsuario: { type: String, required: true, unique: true },
  contrasena: { type: String, required: true }
});

esquemaUsuario.pre('save', async function(next) {
  if (this.isModified('contrasena')) {
    this.contrasena = await bcrypt.hash(this.contrasena, 8);
  }
  next();
});

module.exports = mongoose.model('Usuario', esquemaUsuario);