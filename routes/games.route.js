const express = require('express')
const router = express.Router()
const db = require('../db')
const screens_service = require('../services/games.service')

// Get all games
router.get('/', (req, res) => {

	db.query(`SELECT * FROM screens_games`)
		.then(rows => {
			res.json(rows[0])
		})
		.catch(console.error)
})

// Get total number of games
router.get('/length', (req, res) => {
	db.query(
		`SELECT COUNT(*) AS count
		FROM screens_games`
	).then(rows => {
		res.json(rows[0][0].count)
	}).catch(console.error)
		
})

// Get single game
router.get('/:gameCode(\\w+)', (req, res) => {
	db.query(`SELECT * FROM screens_games WHERE code = ?`, req.params.gameCode)
		.then(rows => {
			res.json(rows[0][0])
		})
		.catch(console.error)
})

module.exports = router