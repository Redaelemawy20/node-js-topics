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
  try {
    const connection = await pool.getConnection();
    return connection;
  } catch (error) {
    console.error('Error getting database connection:', error.message);
    throw error;
  }
}

async function testConnection() {
  try {
    const connection = await pool.getConnection();
    console.log('Successfully connected to MySQL database');
    
    const [rows] = await connection.execute('SELECT VERSION() as version');
    console.log('MySQL Version:', rows[0].version);
    
    const [dbRows] = await connection.execute('SELECT DATABASE() as current_db');
    console.log('Current Database:', dbRows[0].current_db);
    
    connection.release();
    return true;
  } catch (error) {
    console.error('Connection test failed:', error.message);
    throw error;
  }
}

module.exports = {
  pool,
  getConnection,
  testConnection,
};
