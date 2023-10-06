const express = require("express");
const router = express.Router();

const { authenticate } = require("../middleware/authentication");

const {
  getNonGasolineProducts,
  addNonGasolineProduct,
  updateNonGasolineProduct,
  deleteNonGasolineProduct,
} = require("../controllers/nonGasolineController");

router.route("/:propertyId").get(authenticate, getNonGasolineProducts);
router.route("/:propertyId").post(authenticate, addNonGasolineProduct);
router.route("/:id").patch(authenticate, updateNonGasolineProduct);
router.route("/:id").delete(authenticate, deleteNonGasolineProduct);

module.exports = router;
