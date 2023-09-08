const express = require("express");
const router = express.Router();

const { authenticate } = require("../middleware/authentication");

const {
  addDailySalesMetrics,
  getAllDailySalesMetrics,
  getSingleDailySalesMetrics,
  updateSingleDailySalesMetrics,
} = require("../controllers/dailySalesController");

router.route("/:id").get(authenticate, getAllDailySalesMetrics);
router.route("/:id").post(authenticate, addDailySalesMetrics);
router.route("/:id/:salesId").get(authenticate, getSingleDailySalesMetrics);
router
  .route("/:id/:salesId")
  .patch(authenticate, updateSingleDailySalesMetrics);

module.exports = router;
