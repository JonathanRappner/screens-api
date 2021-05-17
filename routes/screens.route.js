const express = require('express')
const router = express.Router()
const db = require('../db')
const screens_service = require('../services/screens.service')

// Get single screenshot's data
router.get('/:id(\\d{10})', (req, res) => {
	const screen_id = req.params.id

	db.query(
		`SELECT
			s.date_time, s.file_name, s.game_code, s.description,
			g.name game_name, g.ico_nbr
		FROM screens s
		INNER JOIN screens_games g
			ON s.game_code = g.code
		WHERE s.id = ?`,
		screen_id,
		(error, rows) => {
			if (rows.length)
			{
				row = rows[0]
				data = { // return object
					ico_nrb: row.ico_nrb,
					description: row.description
				}

				// get thumbnail file_name
				data.path = screens_service.get_paths(screen_id, row.file_name)
				

				
				res.json(data) // success
			}
			else
				res.status(400).json({ message: `Screenshot with id: ${screen_id} doesn't exist.` }) // incorrect id
		}
	)

})

module.exports = router