const { isEmpty } = require("validator"); // validator library for data validation

// Middleware to check if email and password fields are empty during login
const checkIfEmptyLogin = (req, res, next) => {
  const { email, password } = req.body; // Destructure email and password from the request body
  const errObj = {}; // Object to store validation errors

  if (isEmpty(email)) {
    errObj.email = "Email cannot be empty"; // Add an error message for the email if it's empty
  }

  if (isEmpty(password)) {
    errObj.password = "Password cannot be empty"; // Add an error message for the password if it's empty
  }

  // If there are any validation errors, return a response with the error object
  if (Object.keys(errObj).length > 0) {
    return res.status(400).json({
      success: false,
      message: "Error",
      error: errObj,
    });
  } else {
    next(); // If there are no validation errors, proceed to the next middleware
  }
};

module.exports = {
  checkIfEmptyLogin,
};
