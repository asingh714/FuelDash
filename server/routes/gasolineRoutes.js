const express = require("express");
const router = express.Router();

const { authenticate } = require("../middleware/authentication");
const {
  getGasolineProducts,
  addGasolineProduct,
  updateGasolineProduct,
  deleteGasolineProduct,
} = require("../controllers/gasolineController");

router.route("/:id").get(authenticate, getGasolineProducts);
router.route("/:id").post(authenticate, addGasolineProduct);
router.route("/:id").patch(authenticate, updateGasolineProduct);
router.route("/:id").delete(authenticate, deleteGasolineProduct);

module.exports = router;
