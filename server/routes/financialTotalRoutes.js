const express = require("express");
const router = express.Router();

const { authenticate } = require("../middleware/authentication");
const {
  getAllRevenueList,
  getAllRevenueListReverse,
  getGasolineSalesList,
  getAllCashList,
  getAllCreditCardList,
} = require("../controllers/financialTotalController");

router.route("/:propertyId/revenue").get(authenticate, getAllRevenueList);
router
  .route("/:propertyId/revenue/reverse")
  .get(authenticate, getAllRevenueListReverse);

router.route("/:propertyId/gallons").get(authenticate, getGasolineSalesList);
router.route("/:propertyId/cash").get(authenticate, getAllCashList);
router.route("/:propertyId/credit").get(authenticate, getAllCreditCardList);

module.exports = router;
