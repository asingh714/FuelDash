const mongoose = require("mongoose");

const PropertySchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "User ID is required"],
  },
  name: {
    type: String,
    required: [true, "Please provide the name of the gas station"],
  },
  address: {
    type: String,
    required: [true, "Please provide the address of the gas station"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Property", PropertySchema);
