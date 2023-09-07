const mongoose = require("mongoose");

const GasolineProductSchema = new mongoose.Schema({
  propertyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Property",
    required: true,
  },
  gasType: {
    type: String,
    enum: ["Regular", "Midgrade", "Premium", "Diesel", "E85"],
    required: true,
  },
  priceBoughtAt: {
    type: Number,
    required: true,
  },
  priceSoldAt: {
    type: Number,
    required: true,
  },
  dailyGallonsSold: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model("GasolineProduct", GasolineProductSchema);
