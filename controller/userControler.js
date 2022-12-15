 const jwt = require('jsonwebtoken');
 const bcrypt = require('bcryptjs')
 const User = require('../models/userModel')
 const asyncHandler = require('express-async-handler')

const registerUser = asyncHandler( async (req, res ) => {
    const { name, email, password }  = req.body;
    console.log(req.body)
    if(!name  || !email || !password ) {
        res.status(400)
        throw new Error(' Please Insert Valid Data')
    }

    const  UserExists = await User.findOne( { email })

    if(UserExists) {
        res.status(400)
        throw new Error( ' User Already Exists')
    }

    // Hash Password
    const salt = await bcrypt.genSaltSync(10)
    const hashedPassword = await bcrypt.hashSync(password, salt)
    

    //Create user 
     const user = await User.create({
        name,
        email,
        password: hashedPassword
     })
     user.save()

     if(user){
        res.status(201).json({
           _id: user.id,
           name: user.name,
           email: user.email,
           token: generateToken(user._id)
        })
     }
     else{
       res.status(401)
       throw new Error("Invalid Data Formate")
     }

    // res.json({message: 'Register User'})
})

// Authenticate user
// public
const LoginUser = asyncHandler( async(req, res ) => {
      const { email, password } = req.body;
    const user = await User.findOne({ email })
       if(user && ( await bcrypt.compare(password, user.password))){
        res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
       }
       else{
        res.status(401)
        throw new Error("Invalid Data Email")
       }

    res.json({message: 'Login User'})
})

// Generate jwt
const generateToken = ( id ) => {
    return jwt.sign({ id }, process.env.JWT_SECRATE, {
        expiresIn: '30d'
    })
}


const getMe = asyncHandler ( async(req, res) => {
    const {_id, name, email } = await User.findById(req.user.id)
    res.status(200).json({
        _id: _id,
        name: name,
        email: email
    })
})

module.exports = {
    registerUser,
    LoginUser,
    getMe
}