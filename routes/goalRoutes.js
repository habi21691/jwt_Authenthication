const express = require('express')
const { getGoals, setGoals, UpdateGoals, deletetGoals } = require('../controller/goalConteroler')

const router = express.Router()

router.route('/').get(getGoals).post(setGoals)
router.route('/:id').put(UpdateGoals).delete(deletetGoals)




module.exports = router