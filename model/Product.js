const mongoose = require("mongoose");
const { v4: uuid } = require("uuid");

const productSchema = new mongoose.Schema({
  _id: { type: String, default: uuid }, // The user ID is a string and is generated using the uuid library.
  owner: { type: String, ref: "User", required: true },
  productName: { type: String, required: true },
  description: { type: String },
  cost: { type: Number, required: true }, // The cost of the product
  quantity: { type: Number, required: true },
  categories: {
    type: String,
    enum: [
      "books",
      "health & beauty",
      "electronics",
      "home & kitchen",
      "clothing & accessories",
      "tools",
      "sports & outdoors",
      "movies",
      "toys & games",
      "pets & pet supplies",
      "miscellaneous",
    ],
    default: "miscellaneous",
  },
  image: { type: Buffer }, // The image data will be stored as a Buffer
  isPosted: { type: Boolean, default: false },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
