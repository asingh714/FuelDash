const express = require("express");
const router = express.Router();

const { authenticate } = require("../middleware/authentication");
const {
  getAllRevenueList,
  getGasolineSalesList,
} = require("../controllers/financialTotalController");

router.route("/:propertyId/revenue").get(authenticate, getAllRevenueList);
router.route("/:propertyId/gallons").get(authenticate, getGasolineSalesList);

module.exports = router;
