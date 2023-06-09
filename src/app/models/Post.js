const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Định nghĩa schema cho post
const Post = new Schema({
    title: { type: String, required: true },
    image: { type: String, required: true },
    sumary: { type: String, required: true },
    content: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    createAt: { type: Date, default: Date.now },
    Comment: { type: Schema.Types.ObjectId, ref: 'Comment' },


});

// Tạo model cho tập post
module.exports = mongoose.model('Post', Post);