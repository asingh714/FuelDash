const express = require("express");
const router = express.Router();

const { authenticate } = require("../middleware/authentication");
const {
  getGasolineProducts,
  addGasolineProduct,
  updateGasolineProduct,
} = require("../controllers/gasolineController");

router.route("/:id").get(authenticate, getGasolineProducts);
router.route("/:id").post(authenticate, addGasolineProduct);
router.route("/:id").patch( authenticate, updateGasolineProduct)

module.exports = router;
