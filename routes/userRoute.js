const router = require('express').Router()
const { registerMember, registerAdmin, login, whoami } = require('../controllers/userController')
const {restrict} = require('../middlewares/restrict')

router.post('/register', registerMember)
router.post('/register/admin', restrict, registerAdmin)
router.post('/login', login)
router.get('/whoami', restrict, whoami)

module.exports = router