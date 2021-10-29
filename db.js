const config = require('./config')
const mysql = require('mysql2')
const db = mysql.createPool(config.db).promise()

module.exports = db