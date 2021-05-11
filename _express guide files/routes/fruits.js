const express = require('express')
const router = express.Router()

const service = require('../services/fruit.service')

router.get('/', service)

module.exports = router