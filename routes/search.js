const express = require('express');
const axios = require('axios');
const router = express.Router();

const SEARCH_URL = 'http://localhost:3000/search';

router.get('/', async (req, res) => {
  try {
    const response = await axios.get(SEARCH_URL, { params: { q: req.query.q || '' } });
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: 'Gagal mencari properti' });
  }
});

module.exports = router;
