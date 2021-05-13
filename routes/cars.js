const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
	res.status(400).json({'message': 'Please provide car name and number of wheels, yo'})
})

// Car name and nbr of wheels
router.get('/:car_name([A-Za-z]+)/:wheels(\\d+)', (req, res) => {
	res.send(`Car: ${req.params.car_name}\nWheels: ${req.params.wheels}`)
})

module.exports = router