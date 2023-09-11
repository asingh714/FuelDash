const express = require("express");
const router = express.Router();

const { authenticate } = require("../middleware/authentication");

const {
  getNoneGasolineProducts,
  addNoneGasolineProduct,
  updateNoneGasolineProduct,
  deleteNoneGasolineProduct,
} = require("../controllers/nonGasolineController");

router.route("/:propertyId").get(authenticate, getNoneGasolineProducts);
router.route("/:propertyId").post(authenticate, addNoneGasolineProduct);
router.route("/:id").patch(authenticate, updateNoneGasolineProduct);
router.route("/:id").delete(authenticate, deleteNoneGasolineProduct);

module.exports = router;
