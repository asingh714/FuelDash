const express = require("express");
const router = express.Router();

const { authenticate } = require("../middleware/authentication");
const { updatePassword } = require("../controllers/userController");

router.route("/updatePassword").patch(authenticate, updatePassword);

module.exports = router;
