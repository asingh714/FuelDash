const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;

const DailySalesMetrics = require("../models/DailySalesMetrics");

const getAllRevenueList = async (req, res) => {
  const { propertyId } = req.params;

  try {
    const dailySalesMetrics = await DailySalesMetrics.find(
      {
        propertyId,
      },
      "totalRevenue date"
    ).sort({ date: -1 });

    const revenueList = dailySalesMetrics.map((metric) => ({
      id: metric._id,
      revenue: parseFloat(metric.totalRevenue),
      date: metric.date,
    }));

    res.status(200).json({ revenueList });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

const getGasolineSalesList = async (req, res) => {
  const { propertyId } = req.params;

  try {
    const results = await DailySalesMetrics.aggregate([
      {
        $match: { propertyId: new ObjectId(propertyId) }, // Filter by propertyId
      },
      {
        $project: {
          date: 1, // Retain the date field
          totalGallonsSold: {
            $sum: "$gasolineSales.gallonsSold", // Calculate the total gallons sold for each day
          },
        },
      },
      {
        $sort: { date: -1 }, // Sort the results in descending order based on date
      },
    ]);

    res.status(200).json({ results });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

module.exports = {
  getAllRevenueList,
  getGasolineSalesList,
};
