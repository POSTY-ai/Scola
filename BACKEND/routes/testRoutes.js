const express = require('express');
const router = express.Router();

// GET /api/test : vérifie que le serveur répond
router.get('/test', (req, res) => {
  res.json({ message: 'API Scola opérationnelle' });
});

// GET /api/health : utile pour surveiller le serveur
router.get('/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

module.exports = router;