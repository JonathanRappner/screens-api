const db_config = require('./db_config.json')
const mysql = require('mysql')
const db = mysql.createConnection(db_config)
db.connect()

module.exports = db