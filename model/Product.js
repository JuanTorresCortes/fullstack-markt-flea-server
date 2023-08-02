const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  productName: { type: String, required: true },
  description: { type: String },
  cost: { type: Number, required: true }, // The cost of the product
  quantity: { type: Number, required: true },
  categories: [{ type: String }],
  image: { type: Buffer }, // The image data will be stored as a Buffer
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
