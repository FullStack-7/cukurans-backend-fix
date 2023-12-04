const express = require('express')
const { getOrderDetails, getAllOrder, createOrder, updateOrder, deleteOrder, getUserOrders, getBarberOrders } = require('../controllers/order.controller')
const route = express.Router()
const vt = require('../middleware/auth')

// membuat order
route.post('/', createOrder);
// untuk melihat order apa saja bisa buat admin
route.get('/', getAllOrder);
// bisa buat menampilkan  detail dari orderan
route.get('/:orderId',getOrderDetails);
// mengupdate order
route.put('/:orderId', updateOrder);
route.delete('/:orderId', deleteOrder);
// menampilakn Detail User Order untuk fitur user
route.get('/user/:userId',vt, getUserOrders);
// kayak diatas cuman untuk barber
route.get('/barber/:barberId', getBarberOrders);

module.exports = route