const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  image: { type: String, required: true },
  quantity: { type: Number },
  //slug: { type: String, unique: true }, // unique title for product url
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
