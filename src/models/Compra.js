const mongoose = require('mongoose');

const esquemaCompra = new mongoose.Schema({
  cliente: { type: mongoose.Schema.Types.ObjectId, ref: 'Cliente', required: true },
  articulos: [{ 
    nombre: String, 
    cantidad: Number, 
    precio: Number 
  }],
  total: { type: Number, required: true },
  fecha: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Compra', esquemaCompra);