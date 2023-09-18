const DailySalesMetrics = require("../models/DailySalesMetrics");
const GasolineProduct = require("../models/GasolineProduct");
const { updateGasolineBatches } = require("./gasolineController");
const { updateNonGasolineStocks } = require("./nonGasolineController");

const {
  getTotalGallonsSold,
  getPastSevenDaysRevenue,
  getPastSevenDaysGallonsSold,
  getTopNonGasProducts,
  getAllGasProductsForLatestDailySales,
} = require("../dashboardUtils/dashboardUtils");



const getAllDailySalesMetrics = async (req, res) => {
  const { propertyId } = req.params;

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
  const { propertyId, salesId } = req.params;

  try {
    const dailySalesMetrics = await DailySalesMetrics.findOne({
      propertyId,
      _id: salesId,
    });

    const {
      totalRevenue,
      dailyCreditCardPayments,
      dailyCashPurchases,
      gasolineSales,
    } = dailySalesMetrics;

    console.log()

    const totalGallonsSold = await getTotalGallonsSold(
      propertyId,
      dailySalesMetrics.date
    );
    const sevenDaysRevenue = await getPastSevenDaysRevenue(propertyId);
    const sevenDaysTotalGallons = await getPastSevenDaysGallonsSold(propertyId);
    const topNonGasProducts = await getTopNonGasProducts(propertyId);
    const topGasProducts = await getAllGasProductsForLatestDailySales(
      propertyId
    );

    res.status(200).json({
      totalRevenue,
      dailyCreditCardPayments,
      dailyCashPurchases,
      totalGallonsSold,
      sevenDaysRevenue,
      sevenDaysTotalGallons,
      topNonGasProducts,
      topGasProducts,
    });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

const updateSingleDailySalesMetrics = async (req, res) => {
  const { salesId } = req.params;
  const updatedFields = req.body;

  try {
    const existingRecord = await DailySalesMetrics.findById(salesId);

    if (!existingRecord) {
      return res.status(404).json({ message: "Record not found" });
    }

    for (const sale of existingRecord.gasolineSales) {
      await updateGasolineBatches(
        existingRecord.propertyId,
        sale.gasType,
        -sale.gallonsSold
      );
    }

    for (const sale of existingRecord.nonGasolineSales) {
      await updateNonGasolineStocks(
        existingRecord.propertyId,
        sale.nonGasolineProductId,
        -sale.quantitySold
      );
    }

    for (const sale of updatedFields.gasolineSales) {
      await updateGasolineBatches(
        existingRecord.propertyId,
        sale.gasType,
        sale.gallonsSold
      );
    }

    for (const sale of updatedFields.nonGasolineSales) {
      await updateNonGasolineStocks(
        existingRecord.propertyId,
        sale.nonGasolineProductId,
        sale.quantitySold
      );
    }

    Object.assign(existingRecord, updatedFields);
    await existingRecord.save();

    res.status(200).json({ message: "Record updated successfully" });
  } catch (err) {
    console.error(`An error occurred: ${err.message}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const deleteSingleDailySalesMetrics = async (req, res) => {
  const { salesId } = req.params;

  try {
    const existingRecord = await DailySalesMetrics.findById(salesId);

    if (!existingRecord) {
      return res.status(404).json({ message: "Record not found" });
    }

    for (const sale of existingRecord.gasolineSales) {
      await updateGasolineBatches(
        existingRecord.propertyId,
        sale.gasType,
        -sale.gallonsSold
      );
    }

    for (const sale of existingRecord.nonGasolineSales) {
      await updateNonGasolineStocks(
        existingRecord.propertyId,
        sale.nonGasolineProductId,
        -sale.quantitySold
      );
    }

    await DailySalesMetrics.findByIdAndDelete(salesId);

    res.status(200).json({ message: "Record deleted successfully" });
  } catch (err) {
    console.error(`An error occurred: ${err.message}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const addDailySalesMetrics = async (req, res) => {
  const {
    date,
    totalRevenue,
    dailyCreditCardPayments,
    dailyCashPurchases,
    gasolineSales,
    nonGasolineSales,
  } = req.body;

  const { propertyId } = req.params;

  if (
    !totalRevenue ||
    !dailyCreditCardPayments ||
    !dailyCashPurchases ||
    !gasolineSales ||
    !nonGasolineSales
  ) {
    return res.status(400).json({
      msg: "Please provide total revenue, daily credit card payments, daily cash purchases, and gasoline sales.",
    });
  }

  const dailySalesMetrics = new DailySalesMetrics({
    propertyId,
    date,
    totalRevenue,
    dailyCreditCardPayments,
    dailyCashPurchases,
    gasolineSales,
    nonGasolineSales,
  });

  try {
    await dailySalesMetrics.save();

    for (const sale of gasolineSales) {
      await updateGasolineBatches(propertyId, sale.gasType, sale.gallonsSold);
    }

    for (const sale of nonGasolineSales) {
      await updateNonGasolineStocks(
        propertyId,
        sale.nonGasolineProductId,
        sale.quantitySold
      );
    }

    res
      .status(201)
      .json({ message: "Daily sales metrics added successfully." });
  } catch (err) {
    console.error(`An error occurred: ${err.message}`);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  getAllDailySalesMetrics,
  getSingleDailySalesMetrics,
  updateSingleDailySalesMetrics,
  deleteSingleDailySalesMetrics,
  addDailySalesMetrics,
};
