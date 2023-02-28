const mongoose = require("mongoose");

// Định nghĩa schema cho tập phim
const episodeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  // ...
});

// Tạo model cho tập phim
module.exports = mongoose.model("Episode", episodeSchema);