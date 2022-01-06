const format = require('date-fns/format')

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

// Middleware som körs på alla requests
app.use((req, res, next) => {
	res.header("Access-Control-Allow-Origin", "*")
	res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")

	// logging
	if (methods.includes(req.method.toLowerCase())) {
		console.log(
			format(new Date(), '(yyyy-MM-dd HH:mm:ss)'), // tid
			req.method, // http-metod (GET, POST, osv.)
			req.url, // url
			req.body.length ? JSON.stringify(req.body) : ''
		)
	}
	next() // kör andra middlewares
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