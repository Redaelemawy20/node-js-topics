const express = require('express');
const mysql = require('mysql2/promise');

const app = express();
app.use(express.urlencoded({ extended: true }));

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT || 3307),
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'rootpass',
  database: process.env.DB_NAME || 'orders',
});

const port = Number(process.env.PORT || 3000);

app.get('/', (req, res) => {
  res.type('html').send(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>Create order</title>
  <style>
    body { font-family: system-ui, sans-serif; max-width: 28rem; margin: 2rem auto; padding: 0 1rem; }
    label { display: block; margin-top: 0.75rem; font-weight: 600; }
    input, button { margin-top: 0.25rem; width: 100%; box-sizing: border-box; padding: 0.5rem; }
    button { margin-top: 1rem; cursor: pointer; }
  </style>
</head>
<body>
  <h1>Create order</h1>
  <p>Submits to <code>POST /orders</code> and inserts into MySQL. Debezium publishes the change to Kafka for <code>reporting</code>.</p>
  <form method="post" action="/orders">
    <label for="product_name">Product name</label>
    <input id="product_name" name="product_name" required maxlength="50" />
    <label for="quantity">Quantity</label>
    <input id="quantity" name="quantity" type="number" min="1" required />
    <label for="status">Status</label>
    <input id="status" name="status" value="pending" maxlength="20" />
    <button type="submit">Save order</button>
  </form>
</body>
</html>`);
});

app.post('/orders', async (req, res) => {
  const { product_name, quantity, status } = req.body;
  const qty = parseInt(String(quantity), 10);
  if (!product_name || Number.isNaN(qty)) {
    res.status(400).send('Invalid product_name or quantity');
    return;
  }
  try {
    await pool.execute(
      'INSERT INTO orders (product_name, quantity, status) VALUES (?, ?, ?)',
      [product_name.trim(), qty, (status && String(status).trim()) || 'pending']
    );
    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.status(500).send('Database error');
  }
});

app.listen(port, () => {
  console.log(`Order service http://localhost:${port}`);
});
