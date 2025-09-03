const express = require('express');
const axios = require('axios');
const router = express.Router();

const WISHLIST_URL = 'http://localhost:3000/wishlist';

router.get('/', async (req, res) => {
  const { id_pengguna } = req.query;

  if (!id_pengguna) {
    return res.status(400).json({ message: 'id_pengguna wajib diisi' });
  }

  try {
    const response = await axios.get(WISHLIST_URL, {
      params: { id_pengguna }
    });
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: 'Gagal mengambil wishlist', detail: err.message });
  }
});


router.post('/', async (req, res) => {
  try {
    const response = await axios.post(WISHLIST_URL, req.body);
    res.status(201).json(response.data);
  } catch (err) {
    res.status(500).json({ error: 'Gagal menambahkan ke wishlist' });
  }
});

module.exports = router;
