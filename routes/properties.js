const express = require('express');
const axios = require('axios');
const router = express.Router();

const CATALOG_URL = 'http://localhost:3000/catalog';

router.get('/', async (req, res) => {
  try {
    const response = await axios.get(CATALOG_URL);
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: 'Gagal mengambil daftar properti' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const response = await axios.get(`${CATALOG_URL}/${req.params.id}`);
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: 'Gagal mengambil detail properti' });
  }
});

module.exports = router;
