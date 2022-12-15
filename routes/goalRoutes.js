const express = require('express')
const { getGoals, setGoals, UpdateGoals, deletetGoals } = require('../controller/goalConteroler')
const { protect } = require('../middleware/authMiddleware')

const router = express.Router()

router.route('/').get(protect, getGoals).post(protect, setGoals)
router.route('/:id').put(protect, UpdateGoals).delete(protect, deletetGoals)




module.exports = router