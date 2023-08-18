const express = require("express");
const router = express.Router();
const {
  sendUserMessage,
  deleteMessageById,
  deleteAllUserMessages,
  getUserMessages,
} = require("../controllers/messageController");
const { jwtValidate } = require("../utils/jwtValidate");
// Send a message
router.post("/send/:senderId/:receiverId", sendUserMessage);
// Get all messages of the logged-in user
router.get("/user-messages", getUserMessages);

// delete a message
router.delete(
  "/delete-message/:userId/:messageId",
  jwtValidate,
  deleteMessageById
);

// delete all message
router.delete("/delete-all-messages/:userId", deleteAllUserMessages);
module.exports = router;
