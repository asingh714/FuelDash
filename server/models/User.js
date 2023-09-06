const mongoose = require("mongoose");
const validator = require("validator");

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Please provide an email"],
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: "Please provide a valid email",
    },
  },
  name: {
    type: String,
    required: [true, "Please provide name"],
    minlength: 2,
    maxlength: 50,
  },
  subscriptionStatus: {
    type: String,
    enum: ["Free", "Paid"],
    default: "Free",
  },
  subscriptionStartDate: {
    type: Date,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  verificationToken: {
    type: String,
  },
  tokenExpiration: {
    type: Date,
  },
  stripeCustomerId: {
    type: String,
  },
  stripeSubscriptionId: {
    type: String,
  },
});

module.exports = mongoose.model("User", UserSchema);
