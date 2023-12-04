const express = require('express');
const { getAllUsers } = require('../controllers/admin.controller');
const route = express.Router();

route.get('/users', getAllUsers);

module.exports = route;
