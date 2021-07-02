const moment = require('moment') // time
const chalk = require('chalk') // console.log() colors

// Express
const express = require('express') // API framework
const app = express()
app.use(express.urlencoded({extended: true})); // parse:a body-värden i requests
app.use(express.json()); // hantera json-värden i requests


// Routes
const screens = require('./routes/screens.route')
const games = require('./routes/games.route')

// Variables
const port = 4000
const methods = ['get', 'post', 'put', 'delete'] // skriv inte ut head och options-metoderna

// Middleware that runs on every request
app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

	// logging
	if(methods.includes(req.method.toLowerCase()))
	{
		const now = moment().format('YYYY-MM-DD HH:mm:ss')
		const ipv4_matches = req.ip.match(/\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/)
		const ipv4 = ipv4_matches !== null ? ipv4_matches[0] : 'localhost' // hämtar IPv4-delen ur req.ip, om ingen IPv4 finns, skriv ut 'localhost'
		console.log(
			chalk.green(req.method), // http-metod (GET, POST, osv.)
			chalk.yellow(req.url), // url
			chalk.red(ipv4), // IP
			chalk.blue(`(${now})`) // tid
		)
	}
	
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