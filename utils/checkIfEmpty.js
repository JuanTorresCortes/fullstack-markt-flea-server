const { isEmpty } = require("validator"); // validator library for data validation

// middleware to check id any data fields are empty
const checkIfEmpty = (req, res, next) => {
  const body = req.body; // Request body { "firstName": "Juan", "lastName": "Torres", "email": "juan@gmail.com", "billingAddress": "123 Main Street", "birthday": "1990-05-15", "password": "xxxxxxxx"}
  const errObj = {}; // Object to stor validation errors

  // Iterate over each key in the request body;
  for (const key in body) {
    // if the value is empty, add an error message for the key;
    if (isEmpty(body[key])) {
      errObj[key] = `${key} cannot be empty`;
    }
  }

  // if there are any validation errors, return a response with the error object
  if (Object.keys(errObj).length > 0) {
    return res.status(500).json({
      success: false,
      message: "Error",
      error: errObj,
    });
  } else {
    next(); // if there are no validation errors, proceed to the nxt middleware;
  }
};

module.exports = {
  checkIfEmpty,
};
