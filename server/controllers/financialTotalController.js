const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;
const formatDate = require("../utils/formatDate");
const formatCurrency = require("../utils/formatCurrency");

const DailySalesMetrics = require("../models/DailySalesMetrics");

const getAllRevenueListAscending = async (req, res) => {
  const { propertyId } = req.params;

  try {
    const dailySalesMetrics = await DailySalesMetrics.find(
      {
        propertyId,
      },
      "totalRevenue date"
    ).sort({ date: 1 });

    const revenueList = dailySalesMetrics.map((metric) => ({
      id: metric._id,
      Revenue: metric.totalRevenue,
      // Revenue: formatCurrency((metric.totalRevenue / 100).toFixed(2)),
      Date: formatDate(metric.date),
    }));

    res.status(200).json({ results: revenueList });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

const getAllRevenueListDescending = async (req, res) => {
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
      Revenue: parseFloat(metric.totalRevenue),
      Date: formatDate(metric.date),
    }));

    res.status(200).json({ results: revenueList });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

const getGasolineSalesListAscending = async (req, res) => {
  const { propertyId } = req.params;

  try {
    const results = await DailySalesMetrics.aggregate([
      {
        $match: { propertyId: new ObjectId(propertyId) }, // Filter by propertyId
      },
      {
        $project: {
          date: 1,
          Gallons: {
            $sum: "$gasolineSales.gallonsSold", // Calculate the total gallons sold for each day
          },
        },
      },
      {
        $sort: { date: 1 },
      },
    ]);

    const formattedResults = results.map((result) => ({
      id: result._id,
      Gallons: parseFloat(result.Gallons),
      Date: formatDate(result.date),
    }));

    res.status(200).json({ results: formattedResults });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

const getGasolineSalesListDescending = async (req, res) => {
  const { propertyId } = req.params;

  try {
    const results = await DailySalesMetrics.aggregate([
      {
        $match: { propertyId: new ObjectId(propertyId) }, // Filter by propertyId
      },
      {
        $project: {
          date: 1,
          Gallons: {
            $sum: "$gasolineSales.gallonsSold", // Calculate the total gallons sold for each day
          },
        },
      },
      {
        $sort: { date: -1 },
      },
    ]);

    const formattedResults = results.map((result) => ({
      id: result._id,
      Gallons: parseFloat(result.Gallons),
      Date: formatDate(result.date),
    }));

    res.status(200).json({ results: formattedResults });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

const getAllCashListAscending = async (req, res) => {
  const { propertyId } = req.params;

  try {
    const dailySalesMetrics = await DailySalesMetrics.find(
      {
        propertyId,
      },
      "dailyCashPayments date"
    ).sort({ date: 1 });

    const cashList = dailySalesMetrics.map((metric) => ({
      id: metric._id,
      Cash: parseFloat(metric.dailyCashPayments),
      Date: formatDate(metric.date),
    }));

    res.status(200).json({ results: cashList });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

const getAllCashListDescending = async (req, res) => {
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
      Cash: parseFloat(metric.dailyCashPayments),
      Date: formatDate(metric.date),
    }));

    res.status(200).json({ results: cashList });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

const getAllCreditCardListAscending = async (req, res) => {
  const { propertyId } = req.params;

  try {
    const dailySalesMetrics = await DailySalesMetrics.find(
      {
        propertyId,
      },
      "dailyCreditCardPayments date"
    ).sort({ date: 1 });

    const creditCardList = dailySalesMetrics.map((metric) => ({
      id: metric._id,
      "Credit Card": parseFloat(metric.dailyCreditCardPayments),
      Date: formatDate(metric.date),
    }));

    res.status(200).json({ results: creditCardList });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

const getAllCreditCardListDescending = async (req, res) => {
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
      "Credit Card": parseFloat(metric.dailyCreditCardPayments),
      Date: formatDate(metric.date),
    }));

    res.status(200).json({ results: creditCardList });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

module.exports = {
  getAllRevenueListAscending,
  getAllRevenueListDescending,
  getGasolineSalesListAscending,
  getGasolineSalesListDescending,
  getAllCashListAscending,
  getAllCashListDescending,
  getAllCreditCardListAscending,
  getAllCreditCardListDescending,
};
