const Usuario = require('../models/Usuario');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.obtenerUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.find().select('-contrasena');
    res.status(200).json(usuarios);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los usuarios' });
  }
};

exports.crearUsuario = async (req, res) => {
  try {
    const { nombreUsuario, contrasena } = req.body;
    let usuario = await Usuario.findOne({ nombreUsuario });
    if (usuario) {
      return res.status(400).json({ error: 'El usuario ya existe' });
    }
    usuario = new Usuario({ nombreUsuario, contrasena });
    await usuario.save();
    const token = jwt.sign({ id: usuario._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(201).json({ token, usuario: { id: usuario._id, nombreUsuario: usuario.nombreUsuario } });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el usuario' });
  }
};

exports.login = async (req, res) => {
  try {
    const { nombreUsuario, contrasena } = req.body;
    const usuario = await Usuario.findOne({ nombreUsuario });
    if (!usuario) {
      return res.status(400).json({ error: 'Credenciales inválidas' });
    }
    const esCorrecta = await bcrypt.compare(contrasena, usuario.contrasena);
    if (!esCorrecta) {
      return res.status(400).json({ error: 'Credenciales inválidas' });
    }
    const token = jwt.sign({ id: usuario._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, usuario: { id: usuario._id, nombreUsuario: usuario.nombreUsuario } });
  } catch (error) {
    res.status(500).json({ error: 'Error en el login' });
  }
};

exports.eliminarUsuario = async (req, res) => {
  try {
    const usuarioEliminado = await Usuario.findByIdAndDelete(req.params.id);
    if (!usuarioEliminado) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    res.status(200).json({ mensaje: 'Usuario eliminado con éxito' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el usuario' });
  }
};
