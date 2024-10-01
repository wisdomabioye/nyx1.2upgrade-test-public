const express = require('express')
const router = express.Router()
const WhaleMonitor = require('../controllers/whaleMonitor')

router.post('/set-interval', WhaleMonitor.monitorTransfer)

module.exports = router
