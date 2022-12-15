const mongoose = require('mongoose');

const goalSchema = mongoose.Schema(
    {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      require: true,
      ref: "User"
    },
    text: {
        type: String,
        require: true
    },
},
{
    timestamps: true
})

module.exports = mongoose.model('Goals', goalSchema)