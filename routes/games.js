const express = require('express')
const router = express.Router()
const db = require('../db')

// 
router.get('/', (req, res) => {
	
	db.query(
		`SELECT *
		FROM screens_games`,
		(error, rows) => {
			// error
			if(error) throw error

			res.json(rows)
		}
	)
})

module.exports = router