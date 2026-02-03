# Node.js Topics

A learning project demonstrating Node.js concepts with practical examples.

## Topics Covered

### Rate Limiting
Demonstrates Express rate limiting using `express-rate-limit`. Shows how to limit API requests to prevent abuse.

**Location:** `rate-limit/index.js`

**Run:**
```bash
node rate-limit/index.js
```

The server runs on port 3000. Rate limiter allows 3 requests per 10 seconds on `/api/auth/*` routes.

### Streams
Demonstrates Node.js file streams - both readable and writable streams for efficient file handling.

**Location:** `streams/`

**Run:**
```bash
# Write to file
node streams/writable.js

# Read from file
node streams/readable.js
```

## Requirements

- Node.js
- npm packages: `express`, `express-rate-limit`
