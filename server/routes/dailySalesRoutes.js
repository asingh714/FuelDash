const express = require("express");
const router = express.Router();

const { authenticate } = require("../middleware/authentication");

const { addDailySalesMetrics } = require("../controllers/dailySalesController");

router.route("/:id").post(authenticate, addDailySalesMetrics);

module.exports = router;