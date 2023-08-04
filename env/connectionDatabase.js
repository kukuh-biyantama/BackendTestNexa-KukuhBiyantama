// env/connectionDatabase.js

const mysql = require('mysql2/promise');

const connection = mysql.createPool({
    host: 'gmedia.bz', // Replace with your MySQL host
    user: 'gmedia_democase2', // Replace with your MySQL username
    password: 'Janglidalam29J', // Replace with your MySQL password
    database: 'gmedia_democase', // Replace with your MySQL database name
    port:'3306',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});

// Function to execute a query and return a promise
const executeQuery = (query, params = []) => {
  return connection.query(query, params);
};

module.exports = { executeQuery };
