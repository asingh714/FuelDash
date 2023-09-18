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
  quantityInGallons: {
    type: Number,
    required: true,
  },
  costPerGallon: {
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

module.exports = mongoose.model("GasolineProduct", GasolineProductSchema);
