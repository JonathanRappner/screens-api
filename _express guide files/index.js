const express = require('express')
const app = express()
const menu = require('./routes/menu')
const fruits = require('./routes/fruits')

// Express settings
app.use(express.urlencoded({extended: true}))
app.use(express.json())

// Routes / Endpoints
app.use('/menu', menu)
app.use('/fruits', fruits)

module.exports = app