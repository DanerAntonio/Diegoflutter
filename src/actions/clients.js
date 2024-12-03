const Client = require('../models/client');
const { connectDB } = require('../lib/db');

async function getClients() {
  try {
    await connectDB();
    const clients = await Client.find().sort({ createdAt: -1 });
    return { clients };
  } catch (error) {
    return { error: 'Error al obtener los clientes' };
  }
}

async function getClient(id) {
  try {
    await connectDB();
    const client = await Client.findById(id);
    if (!client) {
      return { error: 'Cliente no encontrado' };
    }
    return { client };
  } catch (error) {
    return { error: 'Error al obtener el cliente' };
  }
}

async function createClient(formData) {
  try {
    await connectDB();
    const client = await Client.create({
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      address: formData.get('address'),
    });
    return { client };
  } catch (error) {
    return { error: 'Error al crear el cliente' };
  }
}

async function updateClient(id, formData) {
  try {
    await connectDB();
    const client = await Client.findByIdAndUpdate(
      id,
      {
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone'),
        address: formData.get('address'),
      },
      { new: true }
    );
    if (!client) {
      return { error: 'Cliente no encontrado' };
    }
    return { client };
  } catch (error) {
    return { error: 'Error al actualizar el cliente' };
  }
}

async function deleteClient(id) {
  try {
    await connectDB();
    const client = await Client.findByIdAndDelete(id);
    if (!client) {
      return { error: 'Cliente no encontrado' };
    }
    return { success: true };
  } catch (error) {
    return { error: 'Error al eliminar el cliente' };
  }
}

async function searchClients(query) {
  try {
    await connectDB();
    const clients = await Client.find({
      $or: [
        { name: { $regex: query, $options: 'i' } },
        { email: { $regex: query, $options: 'i' } },
      ],
    });
    return { clients };
  } catch (error) {
    return { error: 'Error al buscar clientes' };
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

