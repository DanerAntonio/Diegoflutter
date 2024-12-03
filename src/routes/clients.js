// routes/clients.js
const express = require('express');
const router = express.Router();
const { getClients, getClient, createClient, updateClient, deleteClient, searchClients } = require('../actions/clients');

router.get('/', async (req, res) => {
  const result = await getClients();
  res.json(result);
});

router.get('/:id', async (req, res) => {
  const result = await getClient(req.params.id);
  res.json(result);
});

router.post('/', async (req, res) => {
  const result = await createClient(req.body);
  res.json(result);
});

router.put('/:id', async (req, res) => {
  const result = await updateClient(req.params.id, req.body);
  res.json(result);
});

router.delete('/:id', async (req, res) => {
  const result = await deleteClient(req.params.id);
  res.json(result);
});

router.get('/search/:query', async (req, res) => {
  const result = await searchClients(req.params.query);
  res.json(result);
});

module.exports = router;