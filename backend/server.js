const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Glencity Camping API is running...');
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
