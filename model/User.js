const mongoose = require("mongoose");
const { v4: uuid } = require("uuid");
const messageSchema = require("../model/Message");

const userSchema = new mongoose.Schema({
  _id: { type: String, default: uuid },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: {
    type: String,
    required: true,
    lowercase: true,
    trim: true,
    unique: true,
  },
  billingAddress: { type: String, required: true },
  birthday: { type: Date, required: true },
  myItems: [{ type: String, ref: "items" }],
  passwordHash: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  messages: [messageSchema], // Using the imported messageSchema
});

const User = mongoose.model("user", userSchema);

module.exports = User;
