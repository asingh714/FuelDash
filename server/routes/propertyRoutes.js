const express = require("express");
const router = express.Router();

const { authenticate } = require("../middleware/authentication");
const {
  getProperties,
  addProperty,
} = require("../controllers/propertyController");

router.route("/").get(authenticate, getProperties);
router.route("/").post(authenticate, addProperty);

module.exports = router;
