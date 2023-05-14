const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Định nghĩa schema cho post
const Post = new Schema({
    title: { type: String, required: true },
    image: { type: String, required: true },
    content: { type: String, required: true },
    author: { type: String, required: true },

});

// Tạo model cho tập post
module.exports = mongoose.model('Post', Post);