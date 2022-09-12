const mongoose = require('mongoose');

const Comment = new mongoose.Schema({
    comment: { type: String, required: true },
    userId: { type: mongoose.Schema.ObjectId,required: true, ref: 'User' },
    productId: { type: mongoose.Schema.ObjectId,required: true, ref: 'Product' },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Comment', Comment);