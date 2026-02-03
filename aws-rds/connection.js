require('dotenv').config();
const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

async function getConnection() {
  return await pool.getConnection();
}

async function testConnection() {
  const connection = await pool.getConnection();
  await connection.execute('SELECT VERSION()');
  await connection.execute('SELECT DATABASE()');
  connection.release();
  return true;
}

module.exports = {
  pool,
  getConnection,
  testConnection,
};
