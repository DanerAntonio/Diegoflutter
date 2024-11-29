const express = require('express');
const Cliente = require('../models/Cliente'); // Asegúrate de que el modelo de Cliente esté importado
const router = express.Router();

// Obtener todos los clientes
router.get('/', async (req, res) => {
  try {
    const clientes = await Cliente.find();
    res.status(200).json(clientes);
  } catch (err) {
    res.status(500).json({ message: "Error al obtener los clientes", error: err });
  }
});

// Crear un cliente
router.post('/', async (req, res) => {
  const { nombre, correo, telefono } = req.body;

  const cliente = new Cliente({
    nombre,
    correo,
    telefono,
  });

  try {
    await cliente.save();
    res.status(201).json(cliente);
  } catch (err) {
    res.status(400).json({ message: "Error al crear el cliente", error: err });
  }
});

module.exports = router;
