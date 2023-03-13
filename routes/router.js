const router = require('express').Router()
const userRoute = require('./userRoute')
const itemRoute = require('./itemRoute')

router.use('/user', userRoute)
router.use('/item', itemRoute)

module.exports = router