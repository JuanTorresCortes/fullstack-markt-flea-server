const mongoose = require("mongoose");
const { v4: uuid } = require("uuid");

const cartItemSchema = new mongoose.Schema({
  _id: { type: String, default: uuid },
  owner: { type: String, ref: "User", required: true },
  productCurrentOwner: { type: String, required: true },
  image: { type: String, required: true },
  productName: { type: String, required: true },
  description: { type: String, required: true },
  cost: { type: Number, required: true },
});

const CartItem = mongoose.model("CartItem", cartItemSchema);
module.exports = CartItem;
