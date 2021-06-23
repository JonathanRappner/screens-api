const config = require('./config')
const mysql = require('mysql2')
const db = mysql.createConnection(config.db).promise()

module.exports = db