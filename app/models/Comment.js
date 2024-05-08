const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Định nghĩa schema cho comment
const Comment = new Schema({
    content: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    postId: { type: Schema.Types.ObjectId, ref: 'Post' },
    createAt: { type: Date, default: Date.now }
});

// Tạo model cho tập comment
module.exports = mongoose.model('Comment', Comment);