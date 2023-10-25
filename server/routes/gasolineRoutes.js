const express = require("express");
const router = express.Router();

const { authenticate } = require("../middleware/authentication");
const {
  getGasolineProducts,
  addGasolineProduct,
  updateGasolineProduct,
  deleteGasolineProduct,
  getGasolineProductInventory,
} = require("../controllers/gasolineController");

router
  .route("/:propertyId/inventory")
  .get(authenticate, getGasolineProductInventory);
router.route("/:propertyId").get(authenticate, getGasolineProducts);
router.route("/:propertyId").post(authenticate, addGasolineProduct);
router.route("/:id").patch(authenticate, updateGasolineProduct);
router.route("/:id").delete(authenticate, deleteGasolineProduct);

module.exports = router;
