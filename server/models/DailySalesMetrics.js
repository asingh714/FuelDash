const mongoose = require("mongoose");

const DailySalesMetricsSchema = new mongoose.Schema({
  propertyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Property",
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
    required: true,
  },
  totalRevenue: {
    type: Number,
    required: true,
    set: (v) => Math.round(v * 100),
    get: (v) => (v / 100).toFixed(2),
  },
  dailyCashPayments: {
    type: Number,
    required: true,
    set: (v) => Math.round(v * 100),
    get: (v) => (v / 100).toFixed(2),
  },
  dailyCreditCardPayments: {
    type: Number,
    required: true,
    set: (v) => Math.round(v * 100),
    get: (v) => (v / 100).toFixed(2),
  },
  gasolineSales: [
    {
      gasType: {
        type: String,
        enum: ["Regular", "Midgrade", "Premium", "Diesel", "E85"],
        required: true,
      },
      gallonsSold: {
        type: Number,
        required: true,
      },
      priceSoldAt: {
        type: Number,
        required: true,
        set: (v) => Math.round(v * 100),
        get: (v) => (v / 100).toFixed(2),
      },
    },
  ],
  nonGasolineSales: [
    {
      name: {
        type: String,
        required: true,
      },
      quantitySold: {
        type: Number,
        required: true,
      },
      priceSoldAt: {
        type: Number,
        required: true,
        set: (v) => Math.round(v * 100),
        get: (v) => (v / 100).toFixed(2),
      },
    },
  ],
});

DailySalesMetricsSchema.index({ propertyId: 1, date: 1 }, { unique: true });

module.exports = mongoose.model("DailySalesMetrics", DailySalesMetricsSchema);
