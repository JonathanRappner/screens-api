const express = require("express")
const app = express()
const cars = require('./routes/cars')
const fruits = require('./routes/fruits')

// Variables
const port = 3000



// Middleware that runs on every request
app.use((req, res, next) => {
	console.log('A', req.method, 'request was made at', Date.now())
	next() // run the request
})



app.use('/car', cars)
app.use('/fruits?', fruits)




// Root
app.get('/', (req, res) => {
	res.send('root')
})




// Start listening for requests...
app.listen(port, () => {
	console.log(`Server started. Listening to port ${port}...`);
})