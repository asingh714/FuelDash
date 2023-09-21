const mongoose = require("mongoose");
const GasolineProduct = require("../models/GasolineProduct");
const NonGasolineProduct = require("../models/NonGasolineProduct");
const DailySalesMetrics = require("../models/DailySalesMetrics");
const { addGasDelivery } = require("./addData.js");
const fs = require("fs");

const readJSONFile = (filePath) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, "utf-8", (err, data) => {
      if (err) {
        return reject(err);
      }
      resolve(JSON.parse(data));
    });
  });
};

const connectDB = async () => {
  try {
    // Read data from JSON file
    // const parsedData = await readJSONFile("data.json");
    const gasolineData = await readJSONFile("gasolineData.json");
    const gasolineProducts = gasolineData.GasolineProducts;
    const nonGasolineData = await readJSONFile("nonGasolineData.json");
    const nonGasolineProducts = nonGasolineData.NonGasolineProducts;

    // const dailySalesMetricsData = await readJSONFile(
    //   "dailySalesMetricsData.json"
    // );
    // const dailySalesMetrics = dailySalesMetricsData.DailySalesMetrics;

    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB...");

    // Delete all existing records
    // await GasolineProduct.deleteMany({});
    // await NonGasolineProduct.deleteMany({});
    // await DailySalesMetrics.deleteMany({});
    // console.log("All old DB data records deleted.");

    // // Insert new records
    // await GasolineProduct.insertMany(gasolineProducts);
    // await NonGasolineProduct.insertMany(nonGasolineProducts);
    // await DailySalesMetrics.insertMany(dailySalesMetrics);
    // console.log("DB data inserted");
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDB;
