const Order = require('../models/order');
const Barber = require('../models/barber')


module.exports = { 
    updateOrder: async (req, res) => {
        try {
            const orderId = req.params.orderId;
            const updateData = req.body;
    
            const updatedOrder = await Order.findByIdAndUpdate(orderId, updateData, { new: true });
    
            if (!updatedOrder) {
                return res.status(404).json({ message: 'Order not found' });
            }
    
            res.status(200).json({ message: 'Berhasil terupdate', updatedOrder });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    
    
    getOrderDetails: async (req, res) => {
        try {
            const orderId = req.params.orderId;
            const orderDetails = await Order.findById(orderId);
        
            if (!orderDetails) {
                return res.status(404).json({ message: 'Order not found' });
            }
        
            res.status(200).json({
                message: 'Order detail didapatkan',
                orderDetails,
                totalAmount: orderDetails.totalAmount
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
        createOrder: async (req, res) => {
            try {
                const { userId, barberId, selectedServices, selectedAdditionalServices, selectedBarberSchedule, totalAmount, selectedDate,
                    selectedTime, paymentMethod, status} = req.body;
                
                const order = new Order({
                    userId,
                    barberId,
                    selectedServices,
                    selectedAdditionalServices,
                    selectedBarberSchedule,
                    totalAmount,
                    selectedDate,
                    selectedTime,
                    paymentMethod,
                    status
                });

                order.status = 'paid';
    
                const newOrder = await order.save();
                res.status(201).json({ message: 'berhasil membuat order', newOrder });
            } catch (error) {
                res.status(500).json({ message: error.message });
            }
        },
    
    
    
    deleteOrder: async (req, res) => {
        try {
            const orderId = req.params.orderId;
    
            await Order.findByIdAndDelete(orderId);
    
            res.status(200).json({ message: 'berhasil menghapus' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },

    getAllOrder: async(req,res) =>{
        try {
            const allOrders = await Order.find();
        
            res.status(200).json({
                message: 'berhasil mendapatkan data',
                ordersWithTotalAmount: allOrders.map(order => ({
                    order,
                    totalAmount: order.totalAmount // Menggunakan totalAmount dari pesanan
                }))
            });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    getUserOrders: async (req, res) => {
        try {
          const userId = req.params.userId; 
          const userOrders = await Order.find({ userId });
    
          res.status(200).json({
            message: 'Daftar pesanan pengguna',
            data: userOrders,
          });
        } catch (error) {
          res.status(500).json({
            message: 'Gagal mengambil daftar pesanan pengguna',
            error: error.message,
          });
        }
      },
      getBarberOrders: async (req, res) => {
        try {
          const barberId = req.params.barberId;
          const barberOrders = await Order.find({ barberId }).populate('userId');
    
          res.status(200).json({
            message: 'Daftar pesanan barber',
            data: barberOrders,
          });
        } catch (error) {
          res.status(500).json({
            message: 'Gagal mengambil daftar pesanan barber',
            error: error.message,
          });
        }
      },
};


