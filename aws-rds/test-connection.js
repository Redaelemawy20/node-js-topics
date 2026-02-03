const { testConnection } = require('./connection');

async function main() {
  console.log('Testing AWS RDS MySQL connection...\n');
  
  // Check if required environment variables are set
  const requiredVars = ['DB_HOST', 'DB_USER', 'DB_PASSWORD', 'DB_NAME'];
  const missingVars = requiredVars.filter(varName => !process.env[varName]);
  
  if (missingVars.length > 0) {
    console.error('Error: Missing required environment variables:');
    missingVars.forEach(varName => console.error(`  - ${varName}`));
    console.error('\nPlease create a .env file based on .env.example');
    process.exit(1);
  }
  
  try {
    await testConnection();
    console.log('\nConnection test successful!');
    process.exit(0);
  } catch (error) {
    console.error('\nConnection test failed!');
    console.error('Please check:');
    console.error('  1. Your RDS endpoint is correct');
    console.error('  2. Your security group allows inbound traffic on port 3306');
    console.error('  3. Your database credentials are correct');
    console.error('  4. Your database name exists');
    process.exit(1);
  }
}

main();
