var express = require("express");
var router = express.Router();

const {
  createUser,
  loginUser,
  validateUser,
} = require("../controllers/usersControllers");

const { checkIfEmpty } = require("../utils/checkIfEmpty");
const { validateUserData } = require("../utils/validateUserData");
const { jwtValidate } = require("../utils/jwtValidate");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.post("/register", checkIfEmpty, validateUserData, createUser); // Register route with checkIfEmpty and validateData middle wares, and register controller function
router.post("/login", checkIfEmpty, validateUserData, loginUser); // Login route with checkIfEmpty and validateData middle wares, and login controller function
router.get("/validate", jwtValidate, validateUser); // Validate route with jwtMiddleware middleware and validateUser controller function

module.exports = router;
