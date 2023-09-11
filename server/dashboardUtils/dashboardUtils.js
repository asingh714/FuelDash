const DailySalesMetrics = require("../models/DailySalesMetrics");

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

    const revenueArray = records.map((record) => record.totalRevenue);
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

      totalGallonsSoldArray.push(totalGallonsSoldForDay);
    }

    return totalGallonsSoldArray;
  } catch (error) {
    console.error("Error fetching past 7 days gallons sold:", error);
    return [];
  }
};


module.exports = {
  getTotalGallonsSold,
  getPastSevenDaysRevenue,
  getPastSevenDaysGallonsSold,
};
