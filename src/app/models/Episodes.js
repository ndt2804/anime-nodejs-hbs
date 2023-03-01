const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Định nghĩa schema cho tập phim
const Episodes = new Schema ({
  anime_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Anime' },
  episode: { type: Number, required: true },
  title: { type: String, required: true },
  release: { type: Date, required: true },
});

// Tạo model cho tập phim
module.exports = mongoose.model('Episodes', Episodes);