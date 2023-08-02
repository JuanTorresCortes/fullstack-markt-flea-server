const express = require("express");
const router = express.Router();

const { checkIfEmpty } = require("../utils/checkIfEmpty");
const { jwtValidate } = require("../utils/jwtValidate");

const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productsControllers");

router.post("/create-product", jwtValidate, createProduct);
router.get("/all-products", jwtValidate, getAllProducts);
router.put("/edit-product/:id", jwtValidate, updateProduct);
router.delete("/delete-product/:id", jwtValidate, deleteProduct);

module.exports = router;
