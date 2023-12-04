const express = require('express')
const vt = require('../middleware/auth')
const { getAllUser, getByIdUser, addUser, updateUser, deleteUserById } = require('../controllers/user.controller')
const route = express.Router()


route.get('/', getAllUser)
// untuk menampilkan userProfile
route.get('/userprofile/:id',vt, getByIdUser)
route.post('/', addUser)
route.delete('/:id', deleteUserById )
// untuk mengganti userisi profile
route.put('/userprofile/:id' ,updateUser)



module.exports = route
