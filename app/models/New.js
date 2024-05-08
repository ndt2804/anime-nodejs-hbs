const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Định nghĩa schema cho post
const New = new Schema({
    title: { type: String, required: true },
    image: { type: String, required: true },
    content: { type: String, required: true },
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    createAt: { type: Date, default: Date.now }
});

// Tạo model cho tập post
module.exports = mongoose.model('New', New);