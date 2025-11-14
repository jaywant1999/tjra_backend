const mysql = require ("mysql2/promise")

const database = mysql.createPool({
    host:"localhost",
    user:"root",
    password:"mysql",
    database:"tjra"
});

module.exports = database;