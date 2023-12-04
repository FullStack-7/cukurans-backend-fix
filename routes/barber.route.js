const express = require('express')
const { createBarber, getAllBarbers, getBarberById, updateBarberById, deleteBarberById } = require('../controllers/barber.controller')
const route = express.Router()

route.post('/', createBarber)
route.get('/', getAllBarbers)
route.get('/:id', getBarberById)
route.put('/:id', updateBarberById)
route.delete('/:id', deleteBarberById)

module.exports = route