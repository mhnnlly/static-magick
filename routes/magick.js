const router = require('express').Router()
const magick = require('../controllers/magick')

router.get('/', magick.magick)

module.exports = router
