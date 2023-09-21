const express = require("express");
const router = express.Router();

const { authenticate } = require("../middleware/authentication");
const {
  getAllRevenueList,
} = require("../controllers/financialTotalController");

router.route("/:propertyId/revenue").get(authenticate, getAllRevenueList);

module.exports = router;
