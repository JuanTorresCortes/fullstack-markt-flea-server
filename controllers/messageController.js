const User = require("../model/User");
const Message = require("../model/Message");
const jwt = require("jsonwebtoken");

const sendUserMessage = async (req, res) => {
  try {
    const { senderId, receiverId } = req.params;
    const { content } = req.body;

    // Find sender and receiver users
    const senderUser = await User.findById(senderId);
    const senderUserName = await senderUser.firstName.concat(
      " ",
      senderUser.lastName
    );

    const receiverUser = await User.findById(receiverId);
    const receiverUserName = await receiverUser.firstName.concat(
      " ",
      receiverUser.lastName
    );

    if (!senderUser || !receiverUser) {
      return res.status(404).json({
        success: false,
        message: "Sender or receiver not found",
      });
    }

    // Create a new message
    const newMessage = {
      sender: senderId,
      senderName: senderUserName,
      receiver: receiverId,
      receiverName: receiverUserName,
      content: content,
      timestamp: Date.now(),
    };

    // Update the messages arrays for both sender and receiver
    senderUser.messages.push(newMessage);
    receiverUser.messages.push(newMessage);

    await senderUser.save();
    await receiverUser.save();

    res
      .status(200)
      .json({ success: true, message: "Message sent successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error sending message" });
  }
};

const deleteMessageById = async (req, res) => {
  try {
    const { userId, messageId } = req.params;

    // Find the user
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Find the index of the message with the given messageId in the user's messages array
    const messageIndex = user.messages.findIndex(
      (message) => message._id.toString() === messageId
    );

    if (messageIndex === -1) {
      return res.status(404).json({
        success: false,
        message: "Message not found",
      });
    }

    // Remove the message from the user's messages array
    user.messages.splice(messageIndex, 1);

    await user.save();

    res.status(200).json({ success: true, message: "Message deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error deleting message" });
  }
};

const deleteAllUserMessages = async (req, res) => {
  try {
    const { userId } = req.params;

    // Find the user
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Remove all messages from the user's messages array
    user.messages = [];

    await user.save();

    res.status(200).json({ success: true, message: "All messages deleted" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Error deleting messages" });
  }
};

// Controller function to get all messages of the logged-in user
const getUserMessages = async (req, res) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);

    const userId = decodedToken.userId;

    // Find the user in the database using the decoded user ID from the JWT
    const user = await User.findOne({ _id: userId });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Access the messages property of the user document
    const messages = user.messages;

    res.status(200).json({ success: true, messages: messages });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error", error: error });
  }
};

module.exports = {
  sendUserMessage,
  deleteMessageById,
  deleteAllUserMessages,
  getUserMessages,
};
