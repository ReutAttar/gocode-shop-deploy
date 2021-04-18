const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cartSchema = new mongoose.Schema({
  products: [{ product: { type: Schema.Types.ObjectId, ref: "Product" }, amount: { type: Number } }],
  //   price: { type: Number },
  timeStump: { type: Date },
  isCheckedOut: { type: Boolean },
});

const Cart = mongoose.model("Cart", cartSchema);

module.exports = Cart;
