const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String,
    phone: String,
    role: {
        type: String,
        enum: ['user', 'admin', 'barber'],
        default: 'user',
  },
  image: String,
  order:{
    type: mongoose.Schema.Types.ObjectId, ref: 'Order'
  }
})

const User = mongoose.model("User", userSchema)

module.exports = User