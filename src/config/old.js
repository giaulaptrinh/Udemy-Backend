require('dotenv').config()
const mysql = require('mysql2');

const connection = mysql.createConnection({
    //create connection to database
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT,
    password: process.env.DB_PASSWORD,

    // host: "localhost",
    // user: "root",
    // database: "hoidanit",
    // port: "3307",
    // password: "123456",
});
module.exports = connection;

