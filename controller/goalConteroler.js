
const asyncHandler = require('express-async-handler')


const getGoals = asyncHandler( async(req, res) => {
    res.status(200).json({message: " Get Goals"})

}
)
const deletetGoals = asyncHandler( async(req, res) => {
    res.status(200).json({message: ` Delete Goals ${req.params.id} `})

})

const setGoals = asyncHandler(async (req, res) => {
   if(!req.body.text){
    res.status(404)
    throw new Error('please Add a text field')
   }
    res.status(200).json({message: " set Goals"})

})

const UpdateGoals =  asyncHandler( async(req, res) => {
    res.status(200).json({message: `Update Goals ${req.params.id}`})

})

module.exports = {
    getGoals,
    setGoals,
    UpdateGoals,
    deletetGoals
}