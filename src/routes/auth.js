// routes/auth.js
const express = require('express');
const router = express.Router();
const { register, login } = require('../actions/auth');

router.post('/register', async (req, res) => {
  const result = await register(req.body);
  res.json(result);
});

router.post('/login', async (req, res) => {
  const result = await login(req.body);
  res.json(result);
});

module.exports = router;