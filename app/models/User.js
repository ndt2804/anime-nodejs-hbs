const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Định nghĩa schema cho post
const User = new Schema({
    username: { type: String, unique: true },
    password: { type: String, requied: true },
    mail: { type: String, unique: true },
    createAt: { type: Date, default: Date.now }

});

// Tạo model cho tập post
module.exports = mongoose.model('User', User);