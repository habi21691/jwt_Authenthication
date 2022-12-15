const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name: {
        type: String,
        require: [true, 'Please Insert the UserName']
    },
    email: {
       type: String,
       unique: true,
       require: [true, 'Please Insert Your Email']
    },
    password: {
        type: String,
        require: [true, 'Please Insert Your Password']
    }
},
{
     timestamps: true

}
)

module.exports = mongoose.model('User',userSchema )