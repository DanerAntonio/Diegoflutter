const Client = require('../models/client');
const { connectDB } = require('../lib/db');

async function getClients(req, res) {
  try {
    await connectDB();
    const clients = await Client.find().sort({ createdAt: -1 });
    res.status(200).json(clients);
  } catch (error) {
    console.error('Error al obtener los clientes:', error);
    res.status(500).json({ error: 'Error al obtener los clientes' });
  }
}

async function getClient(req, res) {
  try {
    await connectDB();
    const client = await Client.findById(req.params.id);
    if (!client) {
      return res.status(404).json({ error: 'Cliente no encontrado' });
    }
    res.status(200).json(client);
  } catch (error) {
    console.error('Error al obtener el cliente:', error);
    res.status(500).json({ error: 'Error al obtener el cliente' });
  }
}

async function createClient(req, res) {
  try {
    await connectDB();
    const client = await Client.create(req.body);
    res.status(201).json(client);
  } catch (error) {
    console.error('Error al crear el cliente:', error);
    res.status(500).json({ error: 'Error al crear el cliente' });
  }
}

async function updateClient(req, res) {
  try {
    await connectDB();
    const client = await Client.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!client) {
      return res.status(404).json({ error: 'Cliente no encontrado' });
    }
    res.status(200).json(client);
  } catch (error) {
    console.error('Error al actualizar el cliente:', error);
    res.status(500).json({ error: 'Error al actualizar el cliente' });
  }
}

async function deleteClient(req, res) {
  try {
    await connectDB();
    const client = await Client.findByIdAndDelete(req.params.id);
    if (!client) {
      return res.status(404).json({ error: 'Cliente no encontrado' });
    }
    res.status(200).json({ message: 'Cliente eliminado con éxito' });
  } catch (error) {
    console.error('Error al eliminar el cliente:', error);
    res.status(500).json({ error: 'Error al eliminar el cliente' });
  }
}

async function searchClients(req, res) {
  try {
    await connectDB();
    const query = req.params.query;
    const clients = await Client.find({
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { email: { $regex: query, $options: 'i' } },
      ],
    });
    res.status(200).json(clients);
  } catch (error) {
    console.error('Error al buscar clientes:', error);
    res.status(500).json({ error: 'Error al buscar clientes' });
  }
}

module.exports = {
  getClients,
  getClient,
  createClient,
  updateClient,
  deleteClient,
  searchClients,
};