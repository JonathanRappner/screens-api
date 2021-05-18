const moment = require('moment') // time
const chalk = require('chalk') // console.log() colors

// Express
const express = require('express') // API framework
const app = express()


// Routes
const screens = require('./routes/screens.route')
const games = require('./routes/games.route')

// Variables
const port = 3000

// Middleware that runs on every request
app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

	// logging
	const now = moment().format('YYYY-MM-DD HH:mm:ss')
	const ipv4 = req.ip.match(/\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/)[0]
	console.log(chalk.green(req.method), chalk.yellow(req.url), chalk.red(ipv4), chalk.blue(`(${now})`))
	next() // run next middleware
})


// Routes references
app.get('/', (req, res) => {
	res.send('Welcome to the screens API')
})
app.use('/screens', screens)
app.use('/games', games)


// Start listening for requests...
app.listen(port, () => {
	console.log(`Server started. Listening to port ${port}...`);
})