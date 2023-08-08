const express = require("express");
const router = express.Router();
const multer = require("multer");
const storage = multer.memoryStorage(); // Store files in memory

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image")) {
      cb(null, true);
    } else {
      cb(new Error("Not an image! Please upload an image."), false);
    }
  },
});

const { checkIfEmpty } = require("../utils/checkIfEmpty");
const { jwtValidate } = require("../utils/jwtValidate");

const {
  getAllProducts,
  getAllPostedProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productsControllers");

router.post(
  "/create-product",
  jwtValidate,
  upload.single("image"),
  createProduct
);
router.get("/all-products", jwtValidate, getAllProducts);
router.get("/get-posted-products", getAllPostedProducts);
router.put("/edit-product/:id", jwtValidate, updateProduct);
router.delete("/delete-product/:id", jwtValidate, deleteProduct);

module.exports = router;
