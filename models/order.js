const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    barberId: { type: mongoose.Schema.Types.ObjectId, ref: 'Barber' },
    selectedServices: [{
        serviceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Service' },
        price: Number,
    }],
    totalAmount: Number, 
    selectedDate: Date,
    selectedTime: String,
    paymentMethod: {
        type: String,
        default: 'creditCard'
    },
    status: {
        type: String,
        enum: ['pending', 'paid', 'failed'],
        default: 'pending',
    },
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
