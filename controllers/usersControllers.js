const User = require("../model/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// controller function to create new user (registration);
const createUser = async (req, res) => {
  try {
    const { firstName, lastName, email, billingAddress, birthday, password } =
      req.body;
    // Generate a random salt and hash the password using bcrypt;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const userInfo = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      billingAddress: billingAddress,
      birthday: birthday,
      passwordHash: hash,
    };

    //create a new User instance and save it to the database
    const newUser = await new User(userInfo); // grab data;
    await newUser.save(); // save to database
    res.status(200).json({ success: true });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error", error: error });
  }
};

module.exports = {
  createUser,
};
