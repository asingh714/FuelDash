const express = require("express");
const router = express.Router();

const { authenticate } = require("../middleware/authentication");
const {
  getProperties,
  addProperty,
  getSingleProperty,
  updateProperty,
  deleteProperty,
} = require("../controllers/propertyController");

router.route("/").get(authenticate, getProperties);
router.route("/:id").get(authenticate, getSingleProperty);

router.route("/").post(authenticate, addProperty);
router.route("/").patch(authenticate, updateProperty);
router.route("/").delete(authenticate, deleteProperty);

module.exports = router;
