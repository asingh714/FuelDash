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
  getPastSevenDaysPaymentTotals,
} = require("../dashboardUtils/dashboardUtils");

const getAllDailySalesMetrics = async (req, res) => {
  const { propertyId } = req.params;

  try {
    const dailySalesMetrics = await DailySalesMetrics.find({
      propertyId,
    }).sort({ date: -1 });

    res.status(200).json({ dailySalesMetrics });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

const getSingleDailySalesMetrics = async (req, res) => {
  const { propertyId } = req.params;
  const date = new Date(req.params.date);
  console.log(date);

  try {
    const dailySalesMetrics = await DailySalesMetrics.findOne({
      propertyId,
      date: {
        $gte: new Date(date.setHours(0, 0, 0, 0)), // Set the date to the start of the day
        $lte: new Date(date.setHours(23, 59, 59, 999)), // Set the date to the end of the day
      },
    });

    if (!dailySalesMetrics) {
      return res.status(404).json({
        msg: "No daily sales metrics found for the specified date.",
      });
    }
    const {
      totalRevenue,
      dailyCreditCardPayments,
      dailyCashPayments,
      gasolineSales,
    } = dailySalesMetrics;

    const totalGallonsSold = await getTotalGallonsSold(
      propertyId,
      dailySalesMetrics.date
    );
    const sevenDaysRevenue = await getPastSevenDaysRevenue(propertyId, date);
    const sevenDaysTotalGallons = await getPastSevenDaysGallonsSold(
      propertyId,
      date
    );
    const topNonGasProducts = await getTopNonGasProducts(propertyId, date);
    const topGasProducts = await getAllGasProductsForLatestDailySales(
      propertyId,
      date
    );

    const sevenDaysPaymentTotals = await getPastSevenDaysPaymentTotals(
      propertyId,
      date
    );

    res.status(200).json({
      totalRevenue: parseFloat(totalRevenue),
      dailyCreditCardPayments: parseFloat(dailyCreditCardPayments),
      dailyCashPayments: parseFloat(dailyCashPayments),
      totalGallonsSold,
      sevenDaysRevenue,
      sevenDaysTotalGallons,
      topNonGasProducts,
      topGasProducts,
      sevenDaysPaymentTotals,
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
        sale.name,
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
        sale.name,
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
        sale.name,
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
    dailyCashPayments,
    gasolineSales,
    nonGasolineSales,
  } = req.body;

  const { propertyId } = req.params;

  if (
    !totalRevenue ||
    !dailyCreditCardPayments ||
    !dailyCashPayments ||
    !gasolineSales ||
    !nonGasolineSales
  ) {
    return res.status(400).json({
      msg: "Please provide total revenue, daily credit card payments, daily cash purchases, and gasoline sales.",
    });
  }

  try {
    const existingEntry = await DailySalesMetrics.findOne({
      propertyId,
      date,
    });
    if (existingEntry) {
      return res.status(400).json({
        message: "A daily sales metric for this date already exists.",
      });
    }

    const dailySalesMetrics = new DailySalesMetrics({
      propertyId,
      date,
      totalRevenue,
      dailyCreditCardPayments,
      dailyCashPayments,
      gasolineSales,
      nonGasolineSales,
    });

    await dailySalesMetrics.save();

    for (const sale of gasolineSales) {
      await updateGasolineBatches(propertyId, sale.gasType, sale.gallonsSold);
    }

    for (const sale of nonGasolineSales) {
      await updateNonGasolineStocks(propertyId, sale.name, sale.quantitySold);
    }

    // Process updates in parallel
    // await Promise.all([
    //   ...gasolineSales.map((sale) =>
    //     updateGasolineBatches(propertyId, sale.gasType, sale.gallonsSold)
    //   ),
    //   ...nonGasolineSales.map((sale) =>
    //     updateNonGasolineStocks(propertyId, sale.name, sale.quantitySold)
    //   ),
    // ]);

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
