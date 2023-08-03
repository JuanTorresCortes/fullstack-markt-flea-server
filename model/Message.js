// messageSchema.js
const mongoose = require("mongoose");
const { v4: uuid } = require("uuid");

const messageSchema = new mongoose.Schema({
  _id: { type: String, default: uuid },
  sender: { type: String, ref: "User", required: true },
  senderName: { type: String, require: true },
  receiver: { type: String, ref: "User", required: true },
  receiver: { type: String, required: true },
  content: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
});

// module.exports = mongoose.model("Message", messageSchema);
module.exports = messageSchema;
