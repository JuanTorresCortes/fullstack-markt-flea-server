const express = require("express");
const router = express.Router();
const {
  sendUserMessage,
  deleteMessageById,
  deleteAllUserMessages,
} = require("../controllers/messageController");

// Send a message
router.post("/send/:senderId/:receiverId", sendUserMessage);
// delete a message
router.delete("/delete-message/:userId/:messageId", deleteMessageById);
// delete all message
router.delete("/delete-all-messages/:userId", deleteAllUserMessages);
module.exports = router;
