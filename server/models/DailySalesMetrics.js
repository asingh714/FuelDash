const mongoose = require("mongoose");

const DailySalesMetricsSchema = new mongoose.Schema({
  propertyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Property",
    required: true,
  },
  date: {
    type: Date,
    required: true,
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
      type: mongoose.Schema.Types.ObjectId,
      ref: "GasolineProduct",
    },
    {
      gallonsSold: {
        type: Number,
        required: true,
      },
    },
  ],
  nonGasolineSales: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "NonGasolineProduct",
    },
    {
      itemsSold: {
        type: Number,
        required: true,
      },
    },
  ],
});



module.exports = mongoose.model("DailySalesMetrics", DailySalesMetricsSchema);
