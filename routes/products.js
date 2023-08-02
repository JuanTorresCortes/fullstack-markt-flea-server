const express = require("express");
const router = express.Router();

const { checkIfEmpty } = require("../utils/checkIfEmpty");
const { jwtValidate } = require("../utils/jwtValidate");

const {
  getAllProducts,
  getAllPostedProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productsControllers");

router.post("/create-product", jwtValidate, createProduct);
router.get("/all-products", jwtValidate, getAllProducts);
router.get("/get-posted-products", getAllPostedProducts);
router.put("/edit-product/:id", jwtValidate, updateProduct);
router.delete("/delete-product/:id", jwtValidate, deleteProduct);

module.exports = router;
