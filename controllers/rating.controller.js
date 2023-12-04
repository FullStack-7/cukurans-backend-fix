const mongoose = require('mongoose');
const Rating = require('../models/rating');
const calculateAverageRating =  async (barberId) => {
    try {
        const objectId = new mongoose.Types.ObjectId(barberId);
        const result = await Rating.aggregate([
            {
                $match: { barberId: objectId }
            },
            {
                $group: {
                    _id: "$barberId",
                    totalRating: { $sum: "$rating" }
                }
            }
        ]);

        if (result.length > 0) {
            return {
                barberId: result[0]._id,
                totalRating: result[0].totalRating
            };
        }

        return {
            barberId,
            totalRating: 0
        };
    } catch (error) {
        throw new Error(`Error calculating average rating: ${error.message}`);
    }
}

module.exports = {
    addRating: async (req, res) => {
        try {
            const { userId, barberId, rating, pesan } = req.body;
            const newRating = new Rating({ userId, barberId, rating, pesan });
            await newRating.save();
            res.status(201).json({ message: 'Rating added successfully', newRating });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    getAllRatings: async (req, res) => {
        try {
            const ratings = await Rating.find().populate('userId barberId');
            res.status(200).json({ message: 'All ratings retrieved', ratings });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    getRatingById: async (req, res) => {
        try {
            const { barberId } = req.params;
            const ratings = await Rating.find({ barberId });
            res.status(200).json({ message: 'Ratings by Barber ID retrieved', ratings });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    calculateAverageRating,
    getTotalRating: async (req, res) => {
        try {
            const { barberId } = req.params;
            const ratingInfo = await calculateAverageRating(barberId);
            res.status(200).json({ message: 'Total rating retrieved', ratingInfo });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};
