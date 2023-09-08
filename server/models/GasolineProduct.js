const mongoose = require("mongoose");

const GasolineProductBatchSchema = new mongoose.Schema({
  quantityInGallons: {
    type: Number,
    required: true,
  },
  costPerGallon: {
    type: Number,
    required: true,
  },
  receivedDate: {
    type: Date,
    default: Date.now,
  },
});

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
  batches: [GasolineProductBatchSchema],
});

GasolineProductSchema.pre("save", function (next) {
  this.batches.sort(
    (a, b) => new Date(a.receivedDate) - new Date(b.receivedDate)
  );
  next();
});

module.exports = mongoose.model("GasolineProduct", GasolineProductSchema);
