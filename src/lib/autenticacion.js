const express = require('express');
const router = express.Router();
const usuario = require('../controllers/usuario');
const verificarToken = require('../middleware/autenticacion');

// Rutas de autenticación
router.post('/registrar', usuario.crearUsuario); // Abierta
router.post('/login', usuario.login); // Abierta
router.get('/usuarios', verificarToken, usuario.obtenerUsuarios); // Protegida
router.delete('/usuarios/:id', verificarToken, usuario.eliminarUsuario); // Protegida

module.exports = router;
