const mongoose = require('mongoose')

const barberSchema = new mongoose.Schema({
      userId: [{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
      }],
      name: String,
      description: String,
      schedule: [{
        day: String,
        waktu: [String],
      }],
    services: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Service',
    }],
    image: String,
    price: Number,
})

const Barber = mongoose.model("Barber", barberSchema)

module.exports = Barber