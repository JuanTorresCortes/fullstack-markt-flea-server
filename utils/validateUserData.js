const { isEmail, isStrongPassword } = require("validator"); // Validator library for data validation

const validateUserData = (req, res, next) => {
  const { email, password } = req.body; // Destructure email and password from the request body

  const errObj = {}; // Object to store validation errors

  if (!isEmail(email)) {
    errObj.email = "Please enter a valid email"; // Add an error message if the email is not valid
  }
  if (!isStrongPassword(password)) {
    errObj.password =
      "Your password must contain 1 lowercase, 1 uppercase, 1 number, 1 special character, and be at least 8 characters long"; // Add an error message if the password is not strong
  }

  //Object.keys takes all the key and puts it in an array
  if (Object.keys(errObj).length > 0) {
    return res
      .status(401)
      .json({ success: false, message: "Error", error: errObj });
  } else {
    next(); // If there are no validation errors, proceed to the next middleware
  }
};

module.exports = {
  validateUserData,
};
