const express = require('express')
const router = express.Router()
const db = require('../db')
const screens_service = require('../services/screens.service')


/** 
 * Get screenshots without game filter
 * Example: screens/all/1621107351/8 (eight screens incl. 1621107351 and older)
 * Example: screens/all/latest/4 (4 latest/newest screens)
 */
router.get('/all/:start(\\d{10}|latest)/:length(\\d+)', async (req, res) => {
	const start = req.params.start // this screen id and earlier
	const length = parseInt(req.params.length)

	const where_statement = start == 'latest'
		? ''
		: 'WHERE s.id <= ' + start

	const [rows] = await db.query(
		`SELECT
			s.id, s.date_time, s.file_name, s.game_code, s.width, s.height, s.description,
			g.name game_name, g.icon16
		FROM screens s
		INNER JOIN screens_games g
			ON s.game_code = g.code
		${where_statement}
		ORDER BY s.id DESC
		LIMIT ?`,
		length
	)

	// if(error) res.status(500).json({message: error})

	if (rows.length) {
		data = rows.map(row => screens_service.process(row)) // process each row
		res.json(data) // success
	}
	else
		res.status(500)
})

/** 
 * Get screenshots with game filter
 * Example: screens/me/1621107351/8 (eight screens incl. 1621107351 and older)
 * Example: screens/me2/latest/4 (4 latest/newest Mass Effect 2 screens)
 */
router.get('/:game_filter(\\w+)/:start(\\d{10}|latest)/:length(\\d+)', async (req, res) => {
	const game_filter = req.params.game_filter // game code
	const start = req.params.start // this screen id and earlier
	const length = parseInt(req.params.length)

	const where_statement = start == 'latest'
		? ''
		: `s.id <= ${start} AND`

	const [rows] = await db.query(
		`SELECT
			s.id, s.date_time, s.file_name, s.game_code, s.width, s.height, s.description,
			g.name game_name, g.icon16
		FROM screens s
		INNER JOIN screens_games g
			ON s.game_code = g.code
		WHERE
			${where_statement}
			s.game_code = ?
		ORDER BY s.id DESC
		LIMIT ?`,
		[game_filter, length]
	)

	// if(error) res.status(500).json({message: error})

	if (rows.length) {
		data = rows.map(row => screens_service.process(row)) // process each row
		res.json(data) // success
	}
	else
		res.status(500)
})

/** Get single screenshot's data
 * Example screens/1623870259
 */
router.get('/:id(\\d{10})', async (req, res) => {
	const screen_id = req.params.id

	const [rows] = await db.query(
		`SELECT
			s.id, s.date_time, s.file_name, s.game_code, s.width, s.height, s.description,
			g.name game_name, g.ico_nbr
		FROM screens s
		INNER JOIN screens_games g
			ON s.game_code = g.code
		WHERE s.id = ?`,
		screen_id
	)

	// if(error) res.status(500).json({message: error})

	if (rows.length) {
		data = screens_service.process(rows[0])
		res.json(data) // success
	}
	else
		res.status(400).json({ message: `Screenshot with id: ${screen_id} doesn't exist.` }) // incorrect id

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
			if (count)
				res.json(count)
			else
				res.status(400).json({ message: `Game code: ${code} doesn't exist.` }) // incorrect game code
		}
	)
})

module.exports = router