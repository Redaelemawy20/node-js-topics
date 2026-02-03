# AWS RDS MySQL Connection

A simple Node.js application to test and experiment with AWS RDS MySQL database connections. Includes a RESTful API with CRUD operations for a posts table.

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
     - `PORT`: Server port (optional, defaults to 3000)

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

## Running the Application

### Test Database Connection

```bash
npm test
```

Or directly:
```bash
node test-connection.js
```

### Start the API Server

```bash
npm start
```

The server will automatically create the `posts` table on startup if it doesn't exist.

## Posts Table Schema

The `posts` table is automatically created when the server starts. Structure:

```sql
CREATE TABLE IF NOT EXISTS posts (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
```

## API Endpoints

### GET /api/posts
Get all posts, ordered by creation date (newest first).

**Response:** Array of post objects
```json
[
  {
    "id": 1,
    "title": "My Post",
    "content": "Post content here",
    "created_at": "2024-01-01T00:00:00.000Z",
    "updated_at": "2024-01-01T00:00:00.000Z"
  }
]
```

### GET /api/posts/:id
Get a single post by ID.

**Response:** Post object or 404 if not found

### POST /api/posts
Create a new post.

**Request Body:**
```json
{
  "title": "My Post",
  "content": "Post content here"
}
```

**Response:** Created post object (201 status)

### PUT /api/posts/:id
Update an existing post. You can update `title`, `content`, or both.

**Request Body:**
```json
{
  "title": "Updated Title"
}
```
or
```json
{
  "content": "Updated content"
}
```
or both fields.

**Response:** Updated post object or 404 if not found

### DELETE /api/posts/:id
Delete a post by ID.

**Response:** 204 No Content or 404 if not found

## Example Usage

```bash
# Get all posts
curl http://localhost:3000/api/posts

# Create a post
curl -X POST http://localhost:3000/api/posts \
  -H "Content-Type: application/json" \
  -d '{"title": "My Post", "content": "Post content here"}'

# Get a specific post
curl http://localhost:3000/api/posts/1

# Update a post
curl -X PUT http://localhost:3000/api/posts/1 \
  -H "Content-Type: application/json" \
  -d '{"title": "Updated Title"}'

# Delete a post
curl -X DELETE http://localhost:3000/api/posts/1
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
