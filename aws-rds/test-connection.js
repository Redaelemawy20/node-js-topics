const { testConnection } = require('./connection');

async function main() {
  const requiredVars = ['DB_HOST', 'DB_USER', 'DB_PASSWORD', 'DB_NAME'];
  const missingVars = requiredVars.filter(varName => !process.env[varName]);
  
  if (missingVars.length > 0) {
    console.error(`Missing env vars: ${missingVars.join(', ')}`);
    process.exit(1);
  }
  
  try {
    await testConnection();
    console.log('Connection successful');
    process.exit(0);
  } catch (error) {
    console.error('Connection failed: check endpoint, security group, credentials, and database name');
    process.exit(1);
  }
}

main();
