const mysql = require('mysql2/promise');

// Create a connection pool. Using a pool is more efficient than creating a new
// connection for every request, as it manages a set of reusable connections.
const pool = mysql.createPool({
  host: process.env.DB_HOST || '127.0.0.1',
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  connectTimeout: 10000 // 10-second timeout for the initial connection
});

// Test the connection
pool.getConnection()
  .then(connection => {
    console.log('✅ Successfully connected to the MariaDB database.');
    connection.release();
  })
  .catch(err => {
    console.error('============================================================');
    console.error('❌ DATABASE CONNECTION FAILED');
    console.error('============================================================');
    console.error(`Error Code: ${err.code}`);
    console.error(`Error Message: ${err.message}`);
    console.error('------------------------------------------------------------');
    console.error('🕵️‍♂️ Troubleshooting Steps:');

    switch (err.code) {
      case 'ER_ACCESS_DENIED_ERROR':
        console.error('1. VERIFY CREDENTIALS: Double-check DB_USER, DB_PASSWORD, and DB_NAME in your .env file.');
        console.error('2. CHECK USER PERMISSIONS: Ensure the user exists and the password is correct.');
        break;
      case 'ER_HOST_NOT_PRIVILEGED':
        const hostIp = err.message.split("'")[1] || 'your_application_host';
        console.error(`1. GRANT PERMISSIONS: The user '${process.env.DB_USER}' does not have permission to connect from your IP address (${hostIp}).`);
        console.error('2. This is a database permission issue, not a code problem. You need to run SQL commands on your database server.');
        console.error('3. Log into MariaDB on your server (e.g., `sudo mysql`) and run the following commands:');
        console.error(`   GRANT ALL PRIVILEGES ON \`${process.env.DB_NAME}\`.* TO '${process.env.DB_USER}'@'%' IDENTIFIED BY 'your_password';`);
        console.error(`   FLUSH PRIVILEGES;`);
        console.error(`   (Replace 'your_password' with the correct one. Using '%' allows connections from any host. For better security, you can replace '%' with '${hostIp}'.)`);
        break;
      case 'ENOTFOUND':
        console.error('1. CHECK HOSTNAME: The DB_HOST in your .env file seems incorrect or cannot be resolved by DNS.');
        break;
      case 'ECONNREFUSED':
        console.error('1. CHECK DB SERVER: Make sure your MariaDB server is running on the specified host.');
        console.error('2. CHECK PORT: Ensure the database is listening on the default port (3306).');
        console.error('3. CHECK FIREWALL: A firewall on the database server or network might be blocking the connection.');
        break;
      case 'EHOSTUNREACH':
        console.error('1. CHECK NETWORK CONNECTION: Your server cannot find a route to the database host.');
        console.error(`2. PING THE HOST: From your terminal (where you run 'npm start'), try \`ping ${process.env.DB_HOST || 'DB_HOST_IP'}\`. If it fails, there is a network problem between your application and the database server.`);
        console.error('3. CHECK LOCAL FIREWALL: A firewall on your local machine might be blocking the outbound connection.');
        break;
      case 'ETIMEDOUT':
      case 'PROTOCOL_CONNECTION_LOST':
        console.error('1. CHECK NETWORK/FIREWALL: The connection timed out. This is often due to a network issue or a firewall blocking the port (default 3306).');
        console.error('2. CHECK DB `bind-address`: Ensure MariaDB is configured to accept remote connections (it should be set to `0.0.0.0` or the server\'s IP, not `127.0.0.1`).');
        break;
      default:
        console.error('An unexpected error occurred. Please review the details above.');
    }
    
    console.error('------------------------------------------------------------');
    console.error('Please resolve the issue and restart the server.');
    console.error('============================================================');
  });


module.exports = pool;