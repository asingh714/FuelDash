const mongoose = require("mongoose");

const NonGasolineProductSchema = new mongoose.Schema({
  propertyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Property",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: [
      "Beverages",
      "Snacks",
      "Tobacco Products",
      "Automotive Supplies",
      "Groceries",
      "Health & Beauty",
      "Travel and Leisure",
    ],
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  costPerItem: {
    type: Number,
    required: true,
    set: (v) => Math.round(v * 100),
    get: (v) => (v / 100).toFixed(2),
  },
  receivedDate: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("NonGasolineProduct", NonGasolineProductSchema);

