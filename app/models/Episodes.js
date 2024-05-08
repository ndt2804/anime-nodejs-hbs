const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Định nghĩa schema cho tập phim
const Episodes = new Schema({
  episode_video_id: { type: String, required: true },
  episode: { type: String, required: true },
  title: { type: String, required: true },


});

// Tạo model cho tập phim
module.exports = mongoose.model('Episodes', Episodes);