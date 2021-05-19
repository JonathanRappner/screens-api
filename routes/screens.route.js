const express = require('express')
const router = express.Router()
const db = require('../db')
const screens_service = require('../services/screens.service')


/** 
 * Get screenshots without game filter
 * Example: screens/all/1621107351/8 (eight screens incl. 1621107351 and older)
 * Example: screens/all/latest/4 (4 latest/newest screens)
 */
router.get('/all/:start(\\d{10}|latest)/:length(\\d+)', (req, res) => {
	const start = req.params.start // this screen id and earlier
	const length = parseInt(req.params.length)

	const where_statement = start == 'latest'
		? ''
		: 'WHERE s.id <= '+ start

	db.query(
		`SELECT
			s.id, s.date_time, s.file_name, s.game_code, s.description,
			g.name game_name, g.ico_nbr
		FROM screens s
		INNER JOIN screens_games g
			ON s.game_code = g.code
		${where_statement}
		ORDER BY s.id DESC
		LIMIT ?`,
		length,
		(error, rows) => {
			if(error) throw error

			if (rows.length)
			{
				data = rows.map(row => screens_service.process(row)) // process each row
				res.json(data) // success
			}
			else
				res.status(400).json({ message: `Screenshot with id: ${screen_id} doesn't exist.` }) // incorrect id
		}
	)
})

/** 
 * Get screenshots with game filter
 * Example: screens/me/1621107351/8 (eight screens incl. 1621107351 and older)
 * Example: screens/me2/latest/4 (4 latest/newest Mass Effect 2 screens)
 */
router.get('/:game_filter(\\w+)/:start(\\d{10}|latest)/:length(\\d+)', (req, res) => {
	const game_filter = req.params.game_filter // game code
	const start = req.params.start // this screen id and earlier
	const length = parseInt(req.params.length)

	const where_statement = start == 'latest'
		? ''
		: `s.id <= ${start} AND`

	db.query(
		`SELECT
			s.id, s.date_time, s.file_name, s.game_code, s.description,
			g.name game_name, g.ico_nbr
		FROM screens s
		INNER JOIN screens_games g
			ON s.game_code = g.code
		WHERE
			${where_statement}
			s.game_code = ?
		ORDER BY s.id DESC
		LIMIT ?`,
		[game_filter, length],
		(error, rows) => {
			if(error) throw error

			if (rows.length)
			{
				data = rows.map(row => screens_service.process(row)) // process each row
				res.json(data) // success
			}
			else
				res.status(400).json({ message: `Screenshot with id: ${screen_id} doesn't exist.` }) // incorrect id
		}
	)
})

/** Get single screenshot's data */
router.get('/:id(\\d{10})', (req, res) => {
	const screen_id = req.params.id

	db.query(
		`SELECT
			s.id, s.date_time, s.file_name, s.game_code, s.description,
			g.name game_name, g.ico_nbr
		FROM screens s
		INNER JOIN screens_games g
			ON s.game_code = g.code
		WHERE s.id = ?`,
		screen_id,
		(error, rows) => {
			if (rows.length)
			{
				test = screens_service.get_paths(1621012474, 'me_2021-05-14_19.14.34.webp')
				data = screens_service.process(rows[0])
				res.json(data) // success
			}
			else
				res.status(400).json({ message: `Screenshot with id: ${screen_id} doesn't exist.` }) // incorrect id
		}
	)

})

module.exports = router