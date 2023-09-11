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
  },
  totalRevenue: {
    type: Number,
    required: true,
  },
  dailyCreditCardPayments: {
    type: Number,
    required: true,
  },
  dailyCashPurchases: {
    type: Number,
    required: true,
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
    },
  ],
});

module.exports = mongoose.model("DailySalesMetrics", DailySalesMetricsSchema);
