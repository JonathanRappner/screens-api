const express = require('express')
const router = express.Router()
const db = require('../db')

// Get single screenshot's data
router.get('/:id(\\d{10})', (req, res) => {
	const id = req.params.id
	
	db.query(
		`SELECT
			s.date_time, s.file_name, s.game_code, s.description,
			g.name game_name, g.ico_nbr
		FROM screens s
		INNER JOIN screens_games g
			ON s.game_code = g.code
		WHERE s.id = ?`,
		id,
		(error, rows) => {
			// error
			if(error) throw error

			if(rows.length)
				res.json(rows[0]) // success
			else
				res.status(400).json({message: `Screenshot with id: ${id} doesn't exist.`}) // incorrect id
		}
	)
})

module.exports = router