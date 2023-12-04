const express = require('express')
const { getAllKontak, addKontak } = require('../controllers/kontak.controller')
const route = express.Router()

route.get('/', getAllKontak)
route.post('/', addKontak)

module.exports = route