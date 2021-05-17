const express = require('express')
const router = express.Router()
const db = require('../db')

// Get all games
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


// Get single game


// Get total number of screens
router.get('/length', (req, res) => {
	db.query(
		`SELECT COUNT(*) AS count
		FROM screens`,
		(error, rows) => {
			res.json(rows[0].count)
		}
	)
})

// Get number of screens for one game
router.get('/length/:code(\\w+)', (req, res) => {
	const code = req.params.code

	db.query(
		`SELECT COUNT(*) AS count
		FROM screens
		WHERE game_code = ?`,
		code,
		(error, rows) => {
			const count = rows[0].count
			if(count)
				res.json(count)
			else
				res.status(400).json({message: `Game code: ${code} doesn't exist.`}) // incorrect game code
		}
	)
})

module.exports = router