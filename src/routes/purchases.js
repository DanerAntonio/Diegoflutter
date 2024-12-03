// routes/purchases.js
const express = require('express');
const router = express.Router();
const { getPurchases, getPurchase, createPurchase, updatePurchase, deletePurchase } = require('../actions/pusrchases');

router.get('/', async (req, res) => {
  const result = await getPurchases(req.query.clientId);
  res.json(result);
});

router.get('/:id', async (req, res) => {
  const result = await getPurchase(req.params.id);
  res.json(result);
});

router.post('/', async (req, res) => {
  const result = await createPurchase(req.body);
  res.json(result);
});

router.put('/:id', async (req, res) => {
  const result = await updatePurchase(req.params.id, req.body);
  res.json(result);
});

router.delete('/:id', async (req, res) => {
  const result = await deletePurchase(req.params.id);
  res.json(result);
});

module.exports = router;