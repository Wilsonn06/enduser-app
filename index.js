const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

// Routes
app.use('/properties', require('./routes/properties'));
app.use('/search', require('./routes/search'));
app.use('/wishlist', require('./routes/wishlist'));
app.use('/manajemen_fasilitas', require('./routes/manajemen_fasilitas'));
app.use('/manajemen_properti', require('./routes/manajemen_properti'));

app.listen(8080, "0.0.0.0", () => {
  console.log(`End-user service running on port ${PORT}`);
});
