const express = require("express");
const router = express.Router();

const { authenticate } = require("../middleware/authentication");

const {
  getNonGasolineProducts,
  addNonGasolineProduct,
  updateNonGasolineProduct,
  deleteNonGasolineProduct,
  getNonGasolineProductInventory,
} = require("../controllers/nonGasolineController");

router
  .route("/:propertyId/inventory")
  .get(authenticate, getNonGasolineProductInventory);
router.route("/:propertyId").get(authenticate, getNonGasolineProducts);
router.route("/:propertyId").post(authenticate, addNonGasolineProduct);
router.route("/:id").patch(authenticate, updateNonGasolineProduct);
router.route("/:id").delete(authenticate, deleteNonGasolineProduct);

module.exports = router;
