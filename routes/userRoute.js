const express  = require('express')
const {protect} = require('../middleware/authMiddleware')

const router = express.Router()
const { registerUser, LoginUser, getMe } = require('../controller/userControler')

router.post('/', registerUser)
router.post('/login', LoginUser)
router.get('/Me', protect, getMe)


module.exports = router