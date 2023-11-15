const mongoose = require("mongoose");
const validator = require("validator");

const EmailSubscriber = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Please provide an email"],
    unique: true,
    lowercase: true,
    validate: {
      validator: validator.isEmail,
      message: "Please provide a valid email",
    },
  },
  subscribedAt: {
    type: Date,
    default: Date.now,
  },
  isSubscribed: {
    type: Boolean,
    default: true,
  },
});

module.exports = mongoose.model("EmailSubscriber", EmailSubscriber);
