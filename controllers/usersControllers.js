const User = require("../model/User");
const Product = require("../model/Product");
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

// Controller function for user login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Find the user with the given email in the database
    const foundUser = await User.findOne({ email: email });

    // If user not found or password does not match, return an error response
    if (!foundUser) {
      return res.status(401).json({
        success: false,
        message: "User or Password does not match",
      });
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      foundUser.passwordHash
    );
    if (!isPasswordValid) {
      return res
        .status(401)
        .json({ success: false, message: "User or password dose not match" });
    }

    // Generate a JWT token for authentication
    const token = jwt.sign({ userId: foundUser._id }, process.env.SECRET_KEY, {
      expiresIn: "1hr",
    });

    res.status(200).json({ success: true, token: token });
  } catch (error) {
    console.log(error.message);

    res
      .status(500)
      .json({ success: false, message: error.message, error: error });
  }
};

// Controller function for validating user with JWT
const validateUser = async (req, res) => {
  try {
    const decodedToken = res.locals.decodedToken;
    // Find the user in the database using the decoded user ID from the JWT
    const findUser = await User.findOne({ _id: decodedToken.userId });

    if (!findUser) {
      res.status(401).json({
        success: false,
        message: "error",
        error: { user: "User not found" },
      });
    }

    res
      .status(200)
      .json({
        success: true,
        email: findUser.email,
        firstName: findUser.firstName,
        lastName: findUser.lastName,
      });
  } catch (error) {
    res.status(500).json({ success: false, message: "error", error: error });
  }
};

// Controller function to delete a user and their products
const deleteUserAndProducts = async (req, res) => {
  try {
    const userId = req.params.userId;

    // Find the user by ID
    const userToDelete = await User.findById(userId);

    if (!userToDelete) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Delete all products associated with the user
    await Product.deleteMany({ owner: userId });

    // Delete the user
    await User.findByIdAndDelete(userId);

    res
      .status(200)
      .json({ success: true, message: "User and products deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error", error: error });
  }
};

module.exports = {
  createUser,
  loginUser,
  deleteUserAndProducts,
  validateUser,
};
