const mongoose = require("mongoose");
const validator = require("validator");

const contactSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "Please provide your first name"],
    trim: true,
  },
  lastName: {
    type: String,
    required: [true, "Please provide your last name"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Please provide your email"],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  message: {
    type: String,
    required: [true, "Please provide a message"],
  },
  submittedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Contact", contactSchema);
