const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  quantity: { type: Number, required: true },
  description: { type: String },
  categories: [{ type: String }],
  image: { type: Buffer }, // The image data will be stored as a Buffer
  imageName: { type: String }, // The name of the image file (optional, can be used for reference)
  cost: { type: Number, required: true }, // The cost of the product
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
