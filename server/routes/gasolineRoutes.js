const express = require("express");
const router = express.Router();

const { authenticate } = require("../middleware/authentication");
const {
  getGasolineProducts,
  addGasolineProduct,
} = require("../controllers/gasolineController");

router.route("/:id").get(authenticate, getGasolineProducts);
router.route("/:id").post(authenticate, addGasolineProduct);

module.exports = router;
