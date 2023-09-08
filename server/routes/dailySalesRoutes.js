const express = require("express");
const router = express.Router();

const { authenticate } = require("../middleware/authentication");

const {
  addDailySalesMetrics,
  getAllDailySalesMetrics,
  getSingleDailySalesMetrics
} = require("../controllers/dailySalesController");

router.route("/:id").get(authenticate, getAllDailySalesMetrics);
router.route("/:id").post(authenticate, addDailySalesMetrics);
router.route("/:id/:salesId").get(authenticate, getSingleDailySalesMetrics);

module.exports = router;
