const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ratingSchema = new Schema({
    animeId: { type: Schema.Types.ObjectId, ref: 'Anime', required: true },
    rate: { type: Number, required: true },
    sumRate: { type: Number },
    count: { type: Number, required: true }
});

module.exports = mongoose.model('Rating', ratingSchema);