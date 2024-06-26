const mongoose = require("mongoose");
const { ObjectId } = mongoose.Types;

const DailySalesMetrics = require("../models/DailySalesMetrics");
const NonGasolineProduct = require("../models/NonGasolineProduct");
const formatDate = require("../utils/formatDate");

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

    totalGallonsSold = parseFloat(totalGallonsSold.toFixed(2));

    return totalGallonsSold;
  } catch (error) {
    console.log(error);
  }
};

const getPastSevenDaysRevenue = async (propertyId, date) => {
  const today = new Date(date);
  const sevenDaysAgo = new Date(today);
  sevenDaysAgo.setDate(today.getDate() - 7);

  try {
    const dailySalesMetrics = await DailySalesMetrics.find(
      {
        propertyId,
        date: {
          $gte: sevenDaysAgo,
          $lte: today,
        },
      },
      "totalRevenue date"
    )
      .sort({ date: -1 })
      .limit(7);

    const revenueList = dailySalesMetrics.map((metric) => ({
      id: metric._id,
      Revenue: parseFloat(metric.totalRevenue),
      date: formatDate(metric.date),
    }));

    return revenueList.reverse();
  } catch (error) {
    console.error("Error fetching past 7 days revenue:", error);
    return [];
  }
};

const getPastSevenDaysGallonsSold = async (propertyId, date) => {
  const endDate = new Date(date);
  const startDate = new Date(endDate);
  startDate.setDate(endDate.getDate() - 6);

  const startOfSevenDaysAgo = new Date(
    Date.UTC(
      startDate.getUTCFullYear(),
      startDate.getUTCMonth(),
      startDate.getUTCDate(),
      0,
      0,
      0
    )
  );

  const endOfToday = new Date(
    Date.UTC(
      endDate.getUTCFullYear(),
      endDate.getUTCMonth(),
      endDate.getUTCDate(),
      23,
      59,
      59,
      999
    )
  ); // Setting the end of today as the upper limit of the date range

  try {
    const records = await DailySalesMetrics.find({
      propertyId,
      date: {
        $gte: startOfSevenDaysAgo,
        $lte: endOfToday, // Using $lte instead of $lt to include the entire day
      },
    }).sort({ date: 1 });

    let totalGallonsSoldArray = [];

    for (
      let d = new Date(startOfSevenDaysAgo);
      d <= endOfToday;
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

      totalGallonsSoldForDay = parseFloat(totalGallonsSoldForDay.toFixed(2)); // Fix precision

      const dayName = targetDate.toLocaleDateString("en-US", {
        weekday: "long",
        timeZone: "UTC",
      }); // Get the day name in UTC

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

const getTopNonGasProducts = async (propertyId, date) => {
  const today = new Date(date);
  const sevenDaysAgo = new Date(today);
  sevenDaysAgo.setDate(today.getDate() - 7);

  try {
    const result = await DailySalesMetrics.aggregate([
      {
        $match: {
          propertyId: new ObjectId(propertyId),
          date: { $gte: sevenDaysAgo, $lte: today },
        },
      },
      {
        $unwind: "$nonGasolineSales",
      },
      {
        $group: {
          _id: "$nonGasolineSales.name",
          totalQuantitySold: { $sum: "$nonGasolineSales.quantitySold" },
          averagePrice: { $avg: "$nonGasolineSales.priceSoldAt" },
        },
      },
      {
        $project: {
          _id: 1,
          totalQuantitySold: { $toInt: "$totalQuantitySold" },
          averagePrice: 1,
        },
      },
      {
        $sort: {
          totalQuantitySold: -1,
        },
      },
      {
        $limit: 5,
      },
    ]);

    const topNonGasProducts = result.map((item) => ({
      name: item._id,
      price: item.averagePrice,
      quantitySold: item.totalQuantitySold,
    }));

    return topNonGasProducts;
  } catch (error) {
    console.error("Error getting top non-gas products:", error);
    // return [];
  }
};

const getAllGasProductsForLatestDailySales = async (propertyId, date) => {
  try {
    // Fetch the latest daily sales metrics for the given propertyId
    const latestDailySalesMetrics = await DailySalesMetrics.findOne({
      propertyId,
      date: { $lte: new Date(date) },
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

const getPastSevenDaysPaymentTotals = async (propertyId, date) => {
  const endDate = new Date(date);
  const startDate = new Date(endDate);
  startDate.setDate(endDate.getDate() - 7);

  const startOfStartDate = new Date(
    Date.UTC(
      startDate.getUTCFullYear(),
      startDate.getUTCMonth(),
      startDate.getUTCDate(),
      0,
      0,
      0
    )
  );

  const endOfEndDate = new Date(
    Date.UTC(
      endDate.getUTCFullYear(),
      endDate.getUTCMonth(),
      endDate.getUTCDate(),
      23,
      59,
      59,
      999
    )
  );

  try {
    const records = await DailySalesMetrics.find({
      propertyId,
      date: {
        $gte: startOfStartDate,
        $lte: endOfEndDate,
      },
    }).sort({ date: 1 }); // Sorting by date in ascending order

    const paymentsArray = records.map((record) => ({
      day: formatDate(record.date),
      "Total Credit Card": parseFloat(record.dailyCreditCardPayments),
      "Total Cash": parseFloat(record.dailyCashPayments), // Make sure this matches with your schema, you might have it as `dailyCashPayments`
    }));

    return paymentsArray;
  } catch (error) {
    console.error("Error fetching past 7 days payments:", error);
    return [];
  }
};

module.exports = {
  getTotalGallonsSold,
  getPastSevenDaysRevenue,
  getPastSevenDaysGallonsSold,
  getTopNonGasProducts,
  getAllGasProductsForLatestDailySales,
  getPastSevenDaysPaymentTotals,
};
