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

app.listen(PORT, () => {
  console.log(`End-user service running on port ${PORT}`);
});
