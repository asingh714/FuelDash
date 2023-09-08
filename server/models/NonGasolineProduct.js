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
});

module.exports = mongoose.model("NonGasolineProduct", NonGasolineProductSchema);
