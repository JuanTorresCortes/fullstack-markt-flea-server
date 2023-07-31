var express = require("express");
var router = express.Router();

const { createUser } = require("../controllers/usersControllers");

const { checkIfEmpty } = require("../utils/checkIfEmpty");
const { validateUserData } = require("../utils/validateUserData");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.post("/register", checkIfEmpty, validateUserData, createUser); // Register route with checkIfEmpty and validateData middle wares, and register controller function

module.exports = router;
