const express = require("express")
const app = express()
const port = 3000
const fruits = ['banana', 'orange', 'kiwi']


// Middleware that runs on every request
app.use((req, res, next) => {
	console.log('A', req.method, 'request was made at', Date.now())
	next() // run the request
})



app.use('/car', (req, res, next) => {
	console.log('Something about cars')
	next()
})

app.use('/fruits?', (req, res, next) => {
	console.log('Something about fruits')
	next()
})


// Root
app.get('/', (req, res) => {
	res.send('root')
})

// GET fruit or fruits
app.get('/fruits?/:fruit_id(\\d*)', (req, res) => {
	if(req.params.fruit_id <= (fruits.length - 1))
		res.json(fruits[req.params.fruit_id])
	else
		res.status(500).json({'message': 'Index out of bounds, yo'})
})

// GET fruit or fruits
app.get(/fruits?/, (req, res) => {
	res.status(200).json({fruits})
})

// Car name and nbr of wheels
app.get('/car/:car_name([A-Za-z]+)/:wheels(\\d+)', (req, res) => {
	res.send(`Car: ${req.params.car_name}\nWheels: ${req.params.wheels}`)
})


// Start listening for requests...
app.listen(port, () => {
	console.log(`Server started. Listening to port ${port}...`);
})