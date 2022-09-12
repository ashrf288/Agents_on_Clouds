const mongoose = require("mongoose");

const Product = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
  ownerId: { type: mongoose.Schema.ObjectId, ref: "User" },
});

module.exports = mongoose.model("Product", Product);
