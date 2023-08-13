const CartItem = require("../model/CartItem");
const User = require("../model/User");

// Function to get all cartItems for a specific user
const getAllCartItems = async (req, res) => {
  try {
    // Extract the user ID from the decoded JWT token stored in the response locals
    const user = res.locals.decodedToken.userId;

    // Find all cartItems in the CartItem model where the 'owner' field matches the user ID
    const allItems = await CartItem.find({ owner: user });

    // Convert image buffer to base64
    allItems.forEach((item) => {
      if (item.image) {
        item.image.toString("base64");
      }
    });

    // Respond with the found cartItems in a JSON format with a success flag
    res.status(200).json({ success: true, data: allItems });
  } catch (error) {
    // If an error occurs during the database operation or processing, handle it here
    console.log(error);
    res.status(500).json({ success: false, message: "error", error: error });
  }
};

// Function adds cartItem for a specific user
const addCartItem = async (req, res) => {
  try {
    // Extract the user ID from the decoded JWT token stored in the response locals
    const user = res.locals.decodedToken.userId;

    // Check if the owner and productCurrentOwner are the same
    if (user === req.body.productCurrentOwner) {
      return res.status(400).json({
        success: false,
        message: "You can't add your own item to your cart",
      });
    }

    // Prepare the Product data from the request body
    const cartItemData = {
      owner: user, // Set the owner as the user ID
      productCurrentOwner: req.body.productCurrentOwner,
      image: req.body.image,
      productName: req.body.productName,
      description: req.body.description,
      cost: req.body.cost,
    };

    // Create a new product instance using the prepared data
    const newCartItem = await new CartItem(cartItemData);

    // Save the new Product to the database
    const savedCartItem = await newCartItem.save();

    // Find the User in the Product model and update the 'product' field by adding the newProduct's ID to it
    const updateUser = await User.findOneAndUpdate(
      { _id: user }, // Find the user with the user ID
      { $push: { cartItems: newCartItem._id } } // Add the newProduct's ID to the 'product' array
    );

    // Save the updated user information
    await updateUser.save();

    // Respond with the created product in a JSON format with a success flag
    res.status(200).json({ success: true, data: savedCartItem });
  } catch (error) {
    // If an error occurs during the database operation or processing, handle it here
    console.log(error);
    res.status(500).json({ success: false, message: "error", error: error });
  }
};

// function deletes cartItem
const deleteCartItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = res.locals.decodedToken;
    const findCartItem = await CartItem.findOne({ _id: id });
    if (findCartItem.owner !== userId) {
      return res.status(401).json({
        success: false,
        message: "Error",
        error: { user: "Not authorized" },
      });
    }
    const deletedCartItem = await CartItem.findOneAndDelete({ _id: id });
    await User.findOneAndUpdate({ _id: userId }, { $pull: { cartItem: id } });
    res.status(200).json({ success: true, data: deletedCartItem });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error", error: error });
  }
};

// Export the functions to be used in other parts of the application
module.exports = {
  getAllCartItems,
  addCartItem,
  deleteCartItem,
};
