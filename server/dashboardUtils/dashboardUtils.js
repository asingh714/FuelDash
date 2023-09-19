const DailySalesMetrics = require("../models/DailySalesMetrics");
const NonGasolineProduct = require("../models/NonGasolineProduct");
const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;

const getTotalGallonsSold = async (propertyId, date) => {
  const startOfDay = new Date(date);
  startOfDay.setUTCHours(0, 0, 0, 0);

  const endOfDay = new Date(date);
  endOfDay.setUTCHours(23, 59, 59, 999);

  try {
    const dailySalesMetrics = await DailySalesMetrics.find({
      propertyId,
      date: {
        $gte: startOfDay,
        $lte: endOfDay,
      },
    });

    let totalGallonsSold = 0;
    dailySalesMetrics.forEach((sale) => {
      if (sale.gasolineSales) {
        sale.gasolineSales.forEach((gasSale) => {
          totalGallonsSold += gasSale.gallonsSold;
        });
      }
    });

    return totalGallonsSold;
  } catch (error) {
    console.log(error);
  }
};

const getPastSevenDaysRevenue = async (propertyId) => {
  const today = new Date();
  const sevenDaysAgo = new Date(today);
  sevenDaysAgo.setDate(today.getDate() - 7);

  const startOfToday = new Date(
    Date.UTC(
      today.getUTCFullYear(),
      today.getUTCMonth(),
      today.getUTCDate(),
      0,
      0,
      0
    )
  );
  const startOfSevenDaysAgo = new Date(
    Date.UTC(
      sevenDaysAgo.getUTCFullYear(),
      sevenDaysAgo.getUTCMonth(),
      sevenDaysAgo.getUTCDate(),
      0,
      0,
      0
    )
  );

  try {
    const records = await DailySalesMetrics.find({
      propertyId,
      date: {
        $gte: startOfSevenDaysAgo,
        $lt: startOfToday,
      },
    }).sort({ date: 1 }); // Sorting by date in ascending order

    const revenueArray = records.map((record) => ({
      day: record.date.toISOString().slice(0, 10), // Converts date to "YYYY-MM-DD" format
      revenue: parseInt(record.totalRevenue),
    }));
    return revenueArray;
  } catch (error) {
    console.error("Error fetching past 7 days revenue:", error);
    return [];
  }
};

const getPastSevenDaysGallonsSold = async (propertyId) => {
  const today = new Date();
  const sevenDaysAgo = new Date(today);
  sevenDaysAgo.setDate(today.getDate() - 7);

  const startOfToday = new Date(
    Date.UTC(
      today.getUTCFullYear(),
      today.getUTCMonth(),
      today.getUTCDate(),
      0,
      0,
      0
    )
  );
  const startOfSevenDaysAgo = new Date(
    Date.UTC(
      sevenDaysAgo.getUTCFullYear(),
      sevenDaysAgo.getUTCMonth(),
      sevenDaysAgo.getUTCDate(),
      0,
      0,
      0
    )
  );

  try {
    const records = await DailySalesMetrics.find({
      propertyId,
      date: {
        $gte: startOfSevenDaysAgo,
        $lt: startOfToday,
      },
    }).sort({ date: 1 });

    let totalGallonsSoldArray = [];

    for (
      let d = new Date(startOfSevenDaysAgo);
      d < startOfToday;
      d.setDate(d.getDate() + 1)
    ) {
      const targetDate = new Date(d);
      const startOfTargetDate = new Date(
        Date.UTC(
          targetDate.getUTCFullYear(),
          targetDate.getUTCMonth(),
          targetDate.getUTCDate(),
          0,
          0,
          0
        )
      );
      const endOfTargetDate = new Date(
        Date.UTC(
          targetDate.getUTCFullYear(),
          targetDate.getUTCMonth(),
          targetDate.getUTCDate() + 1,
          0,
          0,
          0
        )
      );

      const recordsForDay = records.filter(
        (record) =>
          new Date(record.date) >= startOfTargetDate &&
          new Date(record.date) < endOfTargetDate
      );

      let totalGallonsSoldForDay = 0;
      for (const record of recordsForDay) {
        for (const sale of record.gasolineSales) {
          totalGallonsSoldForDay += sale.gallonsSold;
        }
      }

      const dayName = targetDate.toLocaleDateString("en-US", {
        weekday: "long",
      }); // Get the day name

      totalGallonsSoldArray.push({
        "Gallons Sold": totalGallonsSoldForDay,
        day: dayName,
      });
    }

    return totalGallonsSoldArray;
  } catch (error) {
    console.error("Error fetching past 7 days gallons sold:", error);
    return [];
  }
};

const getTopNonGasProducts = async (propertyId) => {
  try {
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const result = await DailySalesMetrics.aggregate([
      {
        $match: {
          propertyId: new ObjectId(propertyId),
          date: { $gte: sevenDaysAgo },
        },
      },
      {
        $unwind: "$nonGasolineSales",
      },
      {
        $group: {
          _id: "$nonGasolineSales.nonGasolineProductId",
          totalQuantitySold: { $sum: "$nonGasolineSales.quantitySold" },
          averagePrice: { $avg: "$nonGasolineSales.priceSoldAt" },
        },
      },
      {
        $sort: {
          totalQuantitySold: -1,
        },
      },
      {
        $limit: 5, // Top 5 products, modify as needed
      },
    ]);

    // Populate product names
    const topNonGasProducts = [];

    for (const item of result) {
      const product = await NonGasolineProduct.findById(item._id);
      topNonGasProducts.push({
        id: item._id,
        name: product.name,
        price: parseFloat((item.averagePrice / 100).toFixed(2)),
        quantitySold: item.totalQuantitySold,
      });
    }

    return topNonGasProducts;
  } catch (error) {
    console.error("Error getting top non-gas products:", error);
    return [];
  }
};

const getAllGasProductsForLatestDailySales = async (propertyId) => {
  try {
    // Fetch the latest daily sales metrics for the given propertyId
    const latestDailySalesMetrics = await DailySalesMetrics.findOne({
      propertyId,
    })
      .sort({ date: -1 })
      .limit(1);

    if (!latestDailySalesMetrics) {
      return [];
    }

    const { gasolineSales } = latestDailySalesMetrics;

    // Create an object to aggregate the gallons sold by gasType
    const gasTypeTotals = {};
    gasolineSales.forEach((sale) => {
      if (gasTypeTotals[sale.gasType]) {
        gasTypeTotals[sale.gasType] += sale.gallonsSold;
      } else {
        gasTypeTotals[sale.gasType] = sale.gallonsSold;
      }
    });

    const totalGallonsSold = Object.values(gasTypeTotals).reduce(
      (total, gallons) => total + gallons,
      0
    );

    const gasProducts = Object.keys(gasTypeTotals).map((gasType) => ({
      id: gasType,
      gasType: gasType,
      percentageOfTotal: parseFloat(
        ((gasTypeTotals[gasType] / totalGallonsSold) * 100).toFixed(2)
      ),
    }));

    gasProducts.sort(
      (a, b) =>
        parseFloat(b.percentageOfTotal) - parseFloat(a.percentageOfTotal)
    );

    return gasProducts;
  } catch (error) {
    console.error(
      "Error getting all gas products for latest daily sales:",
      error
    );
    return [];
  }
};

module.exports = {
  getTotalGallonsSold,
  getPastSevenDaysRevenue,
  getPastSevenDaysGallonsSold,
  getTopNonGasProducts,
  getAllGasProductsForLatestDailySales,
};
