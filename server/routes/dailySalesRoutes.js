const express = require("express");
const router = express.Router();

const { authenticate } = require("../middleware/authentication");

const {
  addDailySalesMetrics,
  getAllDailySalesMetrics,
  getSingleDailySalesMetrics,
  updateSingleDailySalesMetrics,
  deleteSingleDailySalesMetrics,
  getSingleDashboardData,
} = require("../controllers/dailySalesController");

router.route("/:propertyId").get(authenticate, getAllDailySalesMetrics);

router
  .route("/:propertyId/:salesId")
  .get(authenticate, getSingleDailySalesMetrics);

router.route("/:propertyId").post(authenticate, addDailySalesMetrics);

router
  .route("/:salesId")
  .patch(authenticate, updateSingleDailySalesMetrics);

router
  .route("/:salesId")
  .delete(authenticate, deleteSingleDailySalesMetrics);

module.exports = router;
