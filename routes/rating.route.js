const express = require('express');
const { addRating, getRatingById, getAllRatings, getTotalRating } = require('../controllers/rating.controller');
const route = express.Router();

route.post('/', addRating);
route.get('/', getAllRatings);
route.get('/:barberId', getRatingById);
route.get('/barber/:barberId/totalRating', getTotalRating);

module.exports = route;