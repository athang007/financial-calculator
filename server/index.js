const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

const dbPath = path.resolve(__dirname, 'finance.db');
const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('Error opening database', err.message);
  } else {
    console.log('Connected to SQLite database.');
    db.run(`CREATE TABLE IF NOT EXISTS transactions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      amount REAL NOT NULL,
      date TEXT NOT NULL,
      category TEXT NOT NULL,
      description TEXT
    )`, (err) => {
      if (err) {
        console.error('Error creating table', err.message);
      }
    });
  }
});

// Get all transactions
app.get('/api/transactions', (req, res) => {
  db.all('SELECT * FROM transactions ORDER BY date DESC', [], (err, rows) => {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({ data: rows });
  });
});

// Add a transaction
app.post('/api/transactions', (req, res) => {
  const { amount, date, category, description } = req.body;
  if (!amount || !date || !category) {
    res.status(400).json({ error: 'Please provide amount, date, and category' });
    return;
  }
  const sql = 'INSERT INTO transactions (amount, date, category, description) VALUES (?,?,?,?)';
  const params = [amount, date, category, description];
  db.run(sql, params, function(err) {
    if (err) {
      res.status(400).json({ error: err.message });
      return;
    }
    res.json({
      message: 'Transaction added successfully',
      data: { id: this.lastID, amount, date, category, description }
    });
  });
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
