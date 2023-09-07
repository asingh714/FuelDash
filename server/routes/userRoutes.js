const express = require("express");
const router = express.Router();

const { authenticate } = require("../middleware/authentication");
const {
  updatePassword,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

router.route("/updatePassword").patch(authenticate, updatePassword);
router.route("/updateUser").patch(authenticate, updateUser);
router.route("/").delete(authenticate, deleteUser);

module.exports = router;
