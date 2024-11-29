const express = require('express');
const Usuario = require('../models/Usuario');
const router = express.Router();

// Ruta para crear un nuevo usuario
router.post('/registrar', async (req, res) => {
  const { nombreUsuario, contrasena } = req.body;

  // Verifica si el nombre de usuario ya existe
  const usuarioExistente = await Usuario.findOne({ nombreUsuario });
  if (usuarioExistente) {
    return res.status(400).json({ message: 'El nombre de usuario ya está en uso' });
  }

  // Crea un nuevo usuario
  const usuario = new Usuario({
    nombreUsuario,
    contrasena
  });

  try {
    // Guarda el usuario en la base de datos
    await usuario.save();
    res.status(201).json({ message: 'Usuario creado exitosamente', usuario });
  } catch (err) {
    res.status(400).json({ message: 'Error al crear el usuario', error: err });
  }
});

module.exports = router;
