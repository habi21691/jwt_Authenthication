
const asyncHandler = require('express-async-handler')

const Goals = require('../models/goalsModel')
 const User = require('../models/userModel')

const getGoals = asyncHandler( async(req, res) => {

    const goal = await Goals.find({ user: req.user.id})
    res.status(200).json(goal)

}
)
const deletetGoals = asyncHandler( async(req, res) => {
      const goalsStatus = await Goals.findById(req.params.id)
      
      if( !goalsStatus){
        res.status(404)
        throw new Error('Goals not found')
      }
      const user = await User.findById(req.user.id)

     if(!user) {
        res.status(401)
        throw new Error('User Not Found')
     }

     if( goalsStatus.user.toString() !== req.user.id) {
        res.status(401)
        throw new Error('User Not authorized')
     }


      await goalsStatus.remove()

        res.status(200).json({id : req.params.id})
})

const setGoals = asyncHandler(async (req, res) => {
   if(!req.body.text){
    res.status(404)
    throw new Error('please Add a text field')
   }

   const goal = await Goals.create({
    text: req.body.text,
    user: req.user.id
   })
    res.status(200).json(goal)

})

const UpdateGoals =  asyncHandler( async(req, res) => {

    const goal = await Goals.findById(req.params.id)
 
     const user = await User.findById(req.user.id)

     if(!user) {
        res.status(401)
        throw new Error('User Not Found')
     }

     if( goal.user.toString() !== user.id) {
        res.status(401)
        throw new Error('User Not authorized')
     }


    if(!goal){
        res.status(400)
        throw new Error(
            'Goals not found'
        )
    }

     const updatesGoal = await Goals.findByIdAndUpdate(req.params.id, req.body, 
        {
            new: true,
        })

    res.status(200).json(updatesGoal)

})

module.exports = {
    getGoals,
    setGoals,
    UpdateGoals,
    deletetGoals
}