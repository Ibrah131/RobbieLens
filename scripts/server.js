const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const app = express();
const PORT = 4000;

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "commandes_db",
});

// Connect to the database
db.connect(err => {
  if (err) {
    console.error("Database connection failed:", err);
    process.exit(1);
  } else {
    console.log("Connected to the database.");
  }
});

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Handle JSON parsing errors
app.use((err, req, res, next) => {
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    console.error("Bad JSON:", err);
    res.status(400).send({ error: "Invalid JSON format" });
  } else {
    next();
  }
});

// Routes

// GET /commandes
app.get('/commandes', (req, res) => {
  const query = "SELECT * FROM commandes";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error retrieving commandes:", err);
      res.status(500).send("Internal Server Error");
      return;
    }
    res.json(results);
  });
});

// POST /commandes
app.post('/commandes', (req, res) => {
  const { id, nom_client, email_client, formule, photographes_supplementaires, options, prix_total, date } = req.body;
  const query = "INSERT INTO commandes SET ?";
  const values = {
    id,
    nom_client,
    email_client,
    formule,
    photographes_supplementaires,
    options: JSON.stringify(options),
    prix_total,
    date,
  };

  console.log("Executing SQL query:", query, "with values:", values);

  db.query(query, values, (err, result) => {
    if (err) {
      console.error("SQL query failed:", err);
      res.status(500).send("Database insertion error");
      return;
    }
    console.log("Row inserted successfully:", result);
    res.status(201).json({ message: "Commande added successfully", id });
  });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
