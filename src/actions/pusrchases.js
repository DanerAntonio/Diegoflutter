const Compra = require('../models/purchase');

// Obtener todas las compras
exports.obtenerCompras = async (req, res) => {
  try {
    const compras = await Compra.find().populate('cliente');
    res.status(200).json(compras);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener las compras' });
  }
};

// Crear una compra
exports.crearCompra = async (req, res) => {
  try {
    const nuevaCompra = new Compra(req.body);
    const compraGuardada = await nuevaCompra.save();
    res.status(201).json(compraGuardada);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear la compra' });
  }
};

// Eliminar una compra
exports.eliminarCompra = async (req, res) => {
  try {
    const compraEliminada = await Compra.findByIdAndDelete(req.params.id);
    if (!compraEliminada) {
      return res.status(404).json({ error: 'Compra no encontrada' });
    }
    res.status(200).json({ mensaje: 'Compra eliminada con éxito' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar la compra' });
  }
};
