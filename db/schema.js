const mysql = require("mysql2/promise");
require("dotenv").config();

(async () => {
  const connection = await mysql.createConnection({
    host: "localhost",
    // Your username
    user: process.env.DB_USER,
    // Your password
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  });

  const databaseName = process.env.DB_NAME;

  //clean data for testing
  await connection.query("DROP DATABASE IF EXISTS " + databaseName);
  await connection.query("CREATE DATABASE " + databaseName);
  await connection.query("USE " + databaseName);

  await connection.end();

  console.log('Database ' + databaseName + ' created!');
})();