const Cliente = require('../models/Cliente');

// Obtener todos los clientes
exports.obtenerClientes = async (req, res) => {
  try {
    const clientes = await Cliente.find();
    res.status(200).json(clientes);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los clientes' });
  }
};

// Crear un cliente
exports.crearCliente = async (req, res) => {
  try {
    const nuevoCliente = new Cliente(req.body);
    const clienteGuardado = await nuevoCliente.save();
    res.status(201).json(clienteGuardado);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el cliente' });
  }
};

// Actualizar un cliente
exports.actualizarCliente = async (req, res) => {
  try {
    const clienteActualizado = await Cliente.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!clienteActualizado) {
      return res.status(404).json({ error: 'Cliente no encontrado' });
    }
    res.status(200).json(clienteActualizado);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el cliente' });
  }
};
