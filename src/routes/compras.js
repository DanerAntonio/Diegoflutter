const express = require('express');
const Compra = require('../models/Compra'); // Asegúrate de que el modelo de Compra esté importado
const router = express.Router();

// Obtener todas las compras
router.get('/', async (req, res) => {
  try {
    const compras = await Compra.find().populate('cliente');
    res.status(200).json(compras);
  } catch (err) {
    res.status(500).json({ message: "Error al obtener las compras", error: err });
  }
});

// Crear una compra
router.post('/', async (req, res) => {
  const { cliente, articulos, total } = req.body;

  const compra = new Compra({
    cliente,
    articulos,
    total,
  });

  try {
    await compra.save();
    res.status(201).json(compra);
  } catch (err) {
    res.status(400).json({ message: "Error al crear la compra", error: err });
  }
});

module.exports = router;
