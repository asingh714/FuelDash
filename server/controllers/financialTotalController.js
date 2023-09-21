const DailySalesMetrics = require("../models/DailySalesMetrics");

const {} = require("../dashboardUtils/dashboardUtils");

const getAllRevenueList = async (req, res) => {
  const { propertyId } = req.params;

  try {
    const dailySalesMetrics = await DailySalesMetrics.find(
      {
        propertyId,
      },
      "totalRevenue date"
    ); // This projection limits the returned fields to just totalRevenue and date

    const revenueList = dailySalesMetrics.map((metric) => ({
      revenue: metric.totalRevenue,
      date: metric.date,
    }));

    res.status(200).json({ revenueList });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

module.exports = {
  getAllRevenueList,
};
