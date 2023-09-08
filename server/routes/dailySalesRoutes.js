const express = require("express");
const router = express.Router();

const { authenticate } = require("../middleware/authentication");

const {
  addDailySalesMetrics,
  getAllDailySalesMetrics,
  getSingleDailySalesMetrics,
  updateSingleDailySalesMetrics,
  deleteSingleDailySalesMetrics,
  getTotalGallonsSold,
} = require("../controllers/dailySalesController");

router.route("/:id").get(authenticate, getAllDailySalesMetrics);
router.route("/:id/totalGallonsSold").get(authenticate, getTotalGallonsSold);
router.route("/:id/:salesId").get(authenticate, getSingleDailySalesMetrics);


router.route("/:id").post(authenticate, addDailySalesMetrics);
router
  .route("/:id/:salesId")
  .patch(authenticate, updateSingleDailySalesMetrics);

router
  .route("/:id/:salesId")
  .delete(authenticate, deleteSingleDailySalesMetrics);

module.exports = router;
