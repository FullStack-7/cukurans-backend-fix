const express = require('express')
const { getAllServices, getServiceById, deleteServiceById, createService, updateData } = require('../controllers/service.controller')
const route = express.Router()

route.get('/', getAllServices)
route.get('/:id', getServiceById)
route.delete('/:id', deleteServiceById)
route.post('/', createService)
route.put('/:id', updateData)
module.exports = route