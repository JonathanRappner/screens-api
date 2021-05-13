const express = require('express')
const router = express.Router()

// Variables
const fruits = ['banana', 'orange', 'kiwi']

// GET fruit or fruits
router.get('/', (req, res) => {
	res.status(200).json({fruits})
})

// GET fruit or fruits
router.get('/:fruit_id(\\d+)', (req, res) => {
	if(req.params.fruit_id <= (fruits.length - 1))
		res.json(fruits[req.params.fruit_id])
	else
		res.status(500).json({'message': 'Index out of bounds, yo'})
})

module.exports = router