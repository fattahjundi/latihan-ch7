const router = require('express').Router()
const { insertItem } = require('../controllers/itemController')
const {restrict} = require('../middlewares/restrict')

router.post('/insert', restrict, insertItem)

module.exports = router