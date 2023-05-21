const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
    animeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Anime',
        required: true
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    messageRating: [{ type: String }],
    numRates: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Rating', ratingSchema);