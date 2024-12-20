const express = require('express');
const cors = require('cors'); // Import the CORS package
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();
const PORT = 4000;

// Enable CORS for all origins
app.use(cors());

app.use(bodyParser.json());

const dataFilePath = './db.json';

const readData = () => {
  const rawData = fs.readFileSync(dataFilePath);
  return JSON.parse(rawData);
};

const writeData = (data) => {
  fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
};

app.get('/commandes', (req, res) => {
  const data = readData();
  res.json(data.commandes);
});

app.post('/commandes', (req, res) => {
  const data = readData();
  const nouvelleCommande = req.body;
  data.commandes.push(nouvelleCommande);
  writeData(data);
  res.status(201).json(nouvelleCommande);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
