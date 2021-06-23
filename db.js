const config = require('./config')
const mysql = require('mysql')
const db = mysql.createConnection(config.db)

module.exports = db