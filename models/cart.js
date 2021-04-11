const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cartSchema = new mongoose.Schema({
  products: [{ type: Schema.Types.ObjectId, ref: "Product" }],
  price: { type: Number },
});

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
