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

// Total Gallons Sold
DailySalesMetrics.aggregate([
  {
    $match: { propertyId: yourPropertyId, date: yourDate },
  },
  {
    $unwind: "$gasolineSales",
  },
  {
    $group: {
      _id: "$propertyId",
      totalGallons: { $sum: "$gasolineSales.gallonsSold" },
    },
  },
]);

// Top 10 Non-Gas Items Sold
DailySalesMetrics.aggregate([
  { $match: { propertyId: yourPropertyId } },
  { $unwind: "$nonGasolineSales" },
  {
    $group: {
      _id: "$nonGasolineSales._id",
      totalItemsSold: { $sum: "$nonGasolineSales.itemsSold" },
    },
  },
  { $sort: { totalItemsSold: -1 } },
  { $limit: 10 },
]);

// Daily Revenue Per Day for the Past 7 Days
DailySalesMetrics.aggregate([
  {
    $match: {
      propertyId: yourPropertyId,
      date: { $gte: sevenDaysAgo, $lte: today },
    },
  },
  {
    $group: {
      _id: "$date",
      dailyRevenue: { $sum: "$totalRevenue" },
    },
  },
  { $sort: { _id: 1 } },
]);

// Total Sold Per Day for the Past 7 Days
DailySalesMetrics.aggregate([
  {
    $match: {
      propertyId: yourPropertyId,
      date: { $gte: sevenDaysAgo, $lte: today },
    },
  },
  {
    $group: {
      _id: "$date",
      totalSold: {
        $sum: { $add: ["$dailyCashPurchases", "$dailyCreditCardPayments"] },
      },
    },
  },
  { $sort: { _id: 1 } },
]);

module.exports = mongoose.model("DailySalesMetrics", DailySalesMetricsSchema);
