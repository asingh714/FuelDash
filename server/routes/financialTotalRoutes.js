const express = require("express");
const router = express.Router();

const { authenticate } = require("../middleware/authentication");
const {
  getAllRevenueListAscending,
  getAllRevenueListDescending,
  getGasolineSalesListAscending,
  getGasolineSalesListDescending,
  getAllCashListAscending,
  getAllCashListDescending,
  getAllCreditCardListAscending,
  getAllCreditCardListDescending,
} = require("../controllers/financialTotalController");

router
  .route("/:propertyId/revenue/ascending")
  .get(authenticate, getAllRevenueListAscending);
router
  .route("/:propertyId/revenue/descending")
  .get(authenticate, getAllRevenueListDescending);

router
  .route("/:propertyId/gallons/ascending")
  .get(authenticate, getGasolineSalesListAscending);

router
  .route("/:propertyId/gallons/descending")
  .get(authenticate, getGasolineSalesListDescending);

router
  .route("/:propertyId/cash/ascending")
  .get(authenticate, getAllCashListAscending);
router
  .route("/:propertyId/cash/descending")
  .get(authenticate, getAllCashListDescending);

router
  .route("/:propertyId/credit/ascending")
  .get(authenticate, getAllCreditCardListAscending);
router
  .route("/:propertyId/credit/descending")
  .get(authenticate, getAllCreditCardListDescending);

module.exports = router;
