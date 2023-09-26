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
          date: 1, 
          totalGallonsSold: {
            $sum: "$gasolineSales.gallonsSold", // Calculate the total gallons sold for each day
          },
        },
      },
      {
        $sort: { date: -1 }, 
      },
    ]);

    res.status(200).json({ results });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

const getAllCashList = async (req, res) => {
  const { propertyId } = req.params;

  try {
    const dailySalesMetrics = await DailySalesMetrics.find(
      {
        propertyId,
      },
      "dailyCashPayments date"
    ).sort({ date: -1 });

    const cashList = dailySalesMetrics.map((metric) => ({
      id: metric._id,
      cashTotal: parseFloat(metric.dailyCashPayments),
      date: metric.date,
    }));

    res.status(200).json({ cashList });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

const getAllCreditCardList = async (req, res) => {
  const { propertyId } = req.params;

  try {
    const dailySalesMetrics = await DailySalesMetrics.find(
      {
        propertyId,
      },
      "dailyCreditCardPayments date"
    ).sort({ date: -1 });

    const creditCardList = dailySalesMetrics.map((metric) => ({
      id: metric._id,
      creditCardTotal: parseFloat(metric.dailyCreditCardPayments),
      date: metric.date,
    }));

    res.status(200).json({ creditCardList });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

module.exports = {
  getAllRevenueList,
  getGasolineSalesList,
  getAllCashList,
  getAllCreditCardList,
};
