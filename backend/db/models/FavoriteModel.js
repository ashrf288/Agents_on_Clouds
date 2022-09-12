const mongoose = require('mongoose');

const Favorite = new mongoose.Schema({
    userId: { type: mongoose.Schema.ObjectId,required: true ,ref: 'User' },
    productId: { type: mongoose.Schema.ObjectId,required: true, ref: 'Product' },
});

module.exports = mongoose.model('Favorite', Favorite);