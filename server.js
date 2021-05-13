const express = require("express") // API framework
const app = express()
const moment = require('moment') // time
const chalk = require('chalk') // console.log() colors

// Routes
const cars = require('./routes/cars')
const fruits = require('./routes/fruits')

// Variables
const port = 3000


// Middleware that runs on every request
app.use((req, res, next) => {
	const now = moment().format('YYYY-MM-DD HH:mm:ss')
	console.log(chalk.green(req.method), chalk.yellow(req.url), chalk.blue(`(${now})`))
	next() // run the request
})


// Routes references
app.use('/car', cars)
app.use('/fruits?', fruits)
app.get('/', (req, res) => {
	res.send('Welcome to the screens API')
})


// Start listening for requests...
app.listen(port, () => {
	console.log(`Server started. Listening to port ${port}...`);
})