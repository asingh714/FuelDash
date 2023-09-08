const DailySalesMetrics = require("../models/DailySalesMetrics");
const GasolineProduct = require("../models/GasolineProduct");
const { updateGasolineBatches } = require("./gasolineController");

const getAllDailySalesMetrics = async (req, res) => {
  const propertyId = req.params.id;

  try {
    const dailySalesMetrics = await DailySalesMetrics.find({
      propertyId,
    });

    res.status(200).json({ dailySalesMetrics });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};
const getSingleDailySalesMetrics = async (req, res) => {
  const propertyId = req.params.id;
  const salesId = req.params.salesId;

  try {
    const dailySalesMetrics = await DailySalesMetrics.findOne({
      propertyId,
      _id: salesId,
    });

    res.status(200).json({ dailySalesMetrics });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

const updateSingleDailySalesMetrics = async (req, res) => {
  const propertyId = req.params.id;
  const salesId = req.params.salesId;

  const {
    date,
    totalRevenue,
    dailyCreditCardPayments,
    dailyCashPurchases,
    gasolineSales,
  } = req.body;

  if (
    !totalRevenue ||
    !dailyCreditCardPayments ||
    !dailyCashPurchases ||
    !gasolineSales
  ) {
    return res.status(400).json({
      msg: "Please provide total revenue, daily credit card payments, and daily cash purchases.",
    });
  }

  const populatedGasolineSales = gasolineSales.map((sale) => ({
    ...sale,
    propertyId,
  }));

  try {
    const dailySalesMetrics = await DailySalesMetrics.findOneAndUpdate(
      {
        propertyId,
        _id: salesId,
      },
      {
        date,
        totalRevenue,
        dailyCreditCardPayments,
        dailyCashPurchases,
        gasolineSales: populatedGasolineSales,
      },
      { new: true }
    );

    if (!dailySalesMetrics) {
      return res.status(404).json({
        msg: `No daily sales metrics found for id ${salesId}`,
      });
    }

    res.status(200).json({ dailySalesMetrics });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

const addDailySalesMetrics = async (req, res) => {
  const {
    date,
    totalRevenue,
    dailyCreditCardPayments,
    dailyCashPurchases,
    gasolineSales,
  } = req.body;
  const propertyId = req.params.id;

  if (
    !totalRevenue ||
    !dailyCreditCardPayments ||
    !dailyCashPurchases ||
    !gasolineSales
  ) {
    return res.status(400).json({
      msg: "Please provide total revenue, daily credit card payments, and daily cash purchases.",
    });
  }
  const populatedGasolineSales = gasolineSales.map((sale) => ({
    ...sale,
    propertyId,
  }));

  const dailySalesMetrics = new DailySalesMetrics({
    propertyId,
    date,
    totalRevenue,
    dailyCreditCardPayments,
    dailyCashPurchases,
    gasolineSales: populatedGasolineSales,
  });
  try {
    // Save the record
    await dailySalesMetrics.save();

    // Iterate through each gasoline sale to update inventory
    for (const sale of gasolineSales) {
      await updateGasolineBatches(propertyId, sale.gasType, sale.gallonsSold);
    }
    res
      .status(201)
      .json({ message: "Daily sales metrics added successfully." });
  } catch (err) {
    console.error("An error occurred:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  getAllDailySalesMetrics,
  addDailySalesMetrics,
  getSingleDailySalesMetrics,
  updateSingleDailySalesMetrics,
};
