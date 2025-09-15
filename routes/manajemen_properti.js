const express = require('express');
const axios = require('axios');
const router = express.Router();

const CATALOG_URL = 'http://localhost:5000/manajemen_properti';

router.get('/', async (req, res) => {
  try {
    const response = await axios.get(CATALOG_URL);
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: 'Gagal mengambil daftar fasilitas' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const response = await axios.get(`${CATALOG_URL}/${req.params.id}`);
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: 'Gagal mengambil detail fasilitas' });
  }
});

module.exports = router;
