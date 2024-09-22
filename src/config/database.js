require('dotenv').config()

// const mysql = require('mysql2/promise');
const mongoose = require('mongoose');
// const connection = mysql.createConnection({
//     //create connection to database
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     database: process.env.DB_NAME,
//     port: process.env.DB_PORT,
  
//     // host: "localhost",
//     // user: "root",
//     // database: "hoidanit",
//     // port: "3307",
//     // password: "123456",
// });
// const connection = mysql.createPool({
//     //create connection to database
//     host: process.env.DB_HOST,
//     user: process.env.DB_USER,
//     database: process.env.DB_NAME,
//     port: process.env.DB_PORT,
//     password: process.env.DB_PASSWORD,
//     waitForConnections: true,
//     connectionLimit: 10,
//     maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
//     idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
//     queueLimit: 0,
//     enableKeepAlive: true,
//     keepAliveInitialDelay: 0,
//     // host: "localhost",
//     // user: "root",
//     // database: "hoidanit",
//     // port: "3307",
//     // password: "123456",
// });
const dbState = [
    { value: 0,  label: "Disconnected" },
    { value: 1, label: "Connected" },
    {value: 2,label: "Connecting"},
    {value: 3, label: "Disconnecting"}
    ];

    
const connection = async ()=>{
        const options={
            user:process.env.DB_USER,
            pass:process.env.DB_PASSWORD,
            dbName :process.env.DB_NAME,
        }
        await mongoose.connect(process.env.DB_HOST,options);
        const state = Number(mongoose.connection.readyState);
        console.log(dbState.find(f => f.value === state).label, "to database"); // connected to db
       
}

module.exports = connection;
