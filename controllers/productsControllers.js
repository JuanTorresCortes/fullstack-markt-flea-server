const Product = require("../model/Product");
const User = require("../model/User");

// Function to get all products for a specific user
const getAllProducts = async (req, res) => {
  try {
    // Extract the user ID from the decoded JWT token stored in the response locals
    const user = res.locals.decodedToken.userId;

    // Find all products in the Product model where the 'owner' field matches the user ID
    const allProducts = await Product.find({ owner: user });

    // Respond with the found product's in a JSON format with a success flag
    res.status(200).json({ success: true, data: allProducts });
  } catch (error) {
    // If an error occurs during the database operation or processing, handle it here
    console.log(error);
    res.status(500).json({ success: false, message: "error", error: error });
  }
};

// Function to create a new Product for a specific user
const createProduct = async (req, res) => {
  try {
    // Extract the user ID from the decoded JWT token stored in the response locals
    const user = res.locals.decodedToken.userId;

    // Prepare the Product data from the request body
    const productData = {
      owner: user, // Set the owner as the user ID
      productName: req.body.productName, // Extract the title from the request body
      description: req.body.description, // Extract the description from the request body
      cost: req.body.cost,
      quantity: req.body.quantity,
      categories: req.body.categories,
      image: req.body.image,
    };

    // Create a new product instance using the prepared data
    const newProduct = await new Product(productData);

    // Save the new Product to the database
    const savedProduct = await newProduct.save();

    // Find the User in the Product model and update the 'product' field by adding the newProduct's ID to it
    const updateUser = await User.findOneAndUpdate(
      { _id: user }, // Find the user with the user ID
      { $push: { products: newProduct._id } } // Add the newProduct's ID to the 'product' array
    );

    // Save the updated user information
    await updateUser.save();

    // Respond with the created product in a JSON format with a success flag
    res.status(200).json({ success: true, data: savedProduct });
  } catch (error) {
    // If an error occurs during the database operation or processing, handle it here
    console.log(error);
    res.status(500).json({ success: false, message: "error", error: error });
  }
};

// Function to update a specific product
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    // Destructure the userId from decodedToken object
    const { userId } = res.locals.decodedToken;

    req.body.lastModified = Date.now();
    if (req.body.completed) {
      req.body.completedDate = Date.now();
    }
    console.log(req.body);
    // Find the product with the given ID in the Product model
    const findProduct = await Product.findOne({ _id: id });

    // Check if the owner of the found product matches the user ID from the JWT token
    if (findProduct.owner !== userId) {
      // If the owner does not match, return an unauthorized status with a failure message
      return res.status(401).json({ success: false, message: "Error" });
    }

    // If the owner matches, update the product with the new data from the request body
    const updateProduct = await Product.findOneAndUpdate({ _id: id }, req.body);

    // Respond with the updated product in a JSON format with a success flag
    res.status(200).json({ success: true, data: updateProduct });
  } catch (error) {
    // If an error occurs during the database operation or processing, handle it here
    console.log(error);
    res.status(500).json({ success: false, message: "Error", error: error });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = res.locals.decodedToken;
    const findProduct = await Product.findOne({ _id: id });
    if (findProduct.owner !== userId) {
      return res.status(401).json({
        success: false,
        message: "Error",
        error: { user: "Not authorized" },
      });
    }
    const deleteProduct = await Product.findOneAndDelete({ _id: id });
    await User.findOneAndUpdate({ _id: userId }, { $pull: { products: id } });
    res.status(200).json({ success: true, data: deleteProduct });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error", error: error });
  }
};

// Export the functions to be used in other parts of the application
module.exports = {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
};
