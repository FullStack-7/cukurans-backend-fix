const Payment = require('../models/payment')



module.exports = {
    createPayment: async (req,res) => {
        try {
            const { userId, orderId, amount, paymentMethod } = req.body;
    
            const newPayment = new Payment({
                userId,
                orderId,
                amount,
                paymentMethod,
            });

            newPayment.status = 'paid';

            const savedPayment = await newPayment.save();
            res.status(201).json({ message: 'Payment created', payment: savedPayment });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    getAllPayment: async (req,res) => {
        try {
            const payments = await Payment.find().populate('userId orderId');
            res.status(200).json({ payments });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    getPaymentById: async (req,res) => {
        try {
            const payment = await Payment.findById(req.params.paymentId);
            if (!payment) {
                return res.status(404).json({ message: 'Payment not found' });
            }
            res.status(200).json({ payment });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    updatePaymentStatus: async (req,res) => {
        try {
            const updatedPayment = await Payment.findByIdAndUpdate(
                req.params.paymentId,
                { status: req.body.status },
                { new: true }
            );
    
            if (!updatedPayment) {
                return res.status(404).json({ message: 'Payment not found' });
            }
    
            res.status(200).json({ message: 'Payment updated', payment: updatedPayment });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    deletePaymentById: async (req,res) => {
        try {
            const deletedPayment = await Payment.findByIdAndDelete(req.params.paymentId);
            if (!deletedPayment) {
                return res.status(404).json({ message: 'Payment not found' });
            }
            res.status(200).json({ message: 'Payment deleted' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
}