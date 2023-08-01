const {
  isEmail,
  isStrongPassword,
  isDate,
  isEmpty,
  isLength,
} = require("validator"); // validation functions from the 'validator' library

const validateUserData = (req, res, next) => {
  const { email, password } = req.body; // Destructure email and password from the request body

  const errObj = {}; // Object to store validation errors

  // Validate email (required, must be a valid email address)
  if (isEmpty(email)) {
    errObj.email = "Email is required";
  } else if (!isEmail(email)) {
    errObj.email = "Please enter a valid email";
  }

  // Validate password (required, strong password with specific criteria)
  if (isEmpty(password)) {
    errObj.password = "Password is required";
  } else if (!isStrongPassword(password)) {
    errObj.password =
      "Your password must contain 1 lowercase, 1 uppercase, 1 number, 1 special character, and be at least 8 characters long";
  }

  //Object.keys takes all the key and puts it in an array
  if (Object.keys(errObj).length > 0) {
    return res
      .status(401)
      .json({ success: false, message: "Validation Error", error: errObj });
  } else {
    next(); // If there are no validation errors, proceed to the next middleware
  }
};

module.exports = {
  validateUserData,
};
