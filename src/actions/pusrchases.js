const Purchase = require('../models/purchase');
const { connectDB } = require('../lib/db');

async function getPurchases(req, res) {
  try {
    await connectDB();
    const purchases = await Purchase.find().populate('client');
    res.status(200).json(purchases);
  } catch (error) {
    console.error('Error al obtener las compras:', error);
    res.status(500).json({ error: 'Error al obtener las compras' });
  }
}

async function createPurchase(req, res) {
  try {
    await connectDB();
    const newPurchase = new Purchase(req.body);
    const savedPurchase = await newPurchase.save();
    res.status(201).json(savedPurchase);
  } catch (error) {
    console.error('Error al crear la compra:', error);
    res.status(500).json({ error: 'Error al crear la compra' });
  }
}

async function deletePurchase(req, res) {
  try {
    await connectDB();
    const deletedPurchase = await Purchase.findByIdAndDelete(req.params.id);
    if (!deletedPurchase) {
      return res.status(404).json({ error: 'Compra no encontrada' });
    }
    res.status(200).json({ message: 'Compra eliminada con éxito' });
  } catch (error) {
    console.error('Error al eliminar la compra:', error);
    res.status(500).json({ error: 'Error al eliminar la compra' });
  }
}

module.exports = {
  getPurchases,
  createPurchase,
  deletePurchase
};