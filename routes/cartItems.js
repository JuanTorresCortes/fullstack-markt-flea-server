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

const { jwtValidate } = require("../utils/jwtValidate");

const {
  addCartItem,
  getAllCartItems,
  deleteCartItem,
} = require("../controllers/cartItemController");

router.post("/add-CartItem", jwtValidate, upload.single("image"), addCartItem);
router.get("/all-cart-items", jwtValidate, getAllCartItems);
router.delete("/delete-CartItem/:id", jwtValidate, deleteCartItem);

module.exports = router;
