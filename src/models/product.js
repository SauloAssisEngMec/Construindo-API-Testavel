const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
});

const Product = mongoose.model("Product", schema);
module.exports = Product;
