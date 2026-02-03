# AWS RDS MySQL Connection

A simple Node.js application to test and experiment with AWS RDS MySQL database connections.

## Prerequisites

- Node.js installed
- AWS RDS MySQL instance created
- RDS security group configured to allow your IP address

## Setup

1. Install dependencies:
```bash
npm install
```

2. Configure environment variables:
   - Copy `.env.example` to `.env`
   - Fill in your RDS connection details:
     - `DB_HOST`: Your RDS endpoint (found in AWS Console)
     - `DB_PORT`: Usually 3306 for MySQL
     - `DB_USER`: Database username
     - `DB_PASSWORD`: Database password
     - `DB_NAME`: Database name

## Getting RDS Connection Details

1. Go to AWS Console → RDS → Databases
2. Click on your RDS instance
3. Find the endpoint under "Connectivity & security"
4. Copy the endpoint (e.g., `mydb.xxxxx.us-east-1.rds.amazonaws.com`)

## Security Group Configuration

Before connecting, ensure your RDS security group allows inbound traffic:

1. Go to AWS Console → RDS → Databases → Your Instance
2. Click on the VPC security group link
3. Edit inbound rules
4. Add a rule:
   - Type: MySQL/Aurora
   - Port: 3306
   - Source: Your IP address (or 0.0.0.0/0 for testing only - not recommended for production)

## Running the Connection Test

```bash
npm test
```

Or directly:
```bash
node test-connection.js
```

## Using the Connection Module

You can use the connection module in your own scripts:

```javascript
const { pool, getConnection, testConnection } = require('./connection');

// Test connection
await testConnection();

// Get a connection from the pool
const connection = await getConnection();
const [rows] = await connection.execute('SELECT * FROM your_table');
connection.release();
```

## Troubleshooting

- **Connection timeout**: Check your security group allows your IP
- **Access denied**: Verify username and password
- **Unknown database**: Make sure the database name exists in your RDS instance
- **Host not found**: Verify the RDS endpoint is correct
