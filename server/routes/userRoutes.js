const express = require("express");
const router = express.Router();

const { authenticate } = require("../middleware/authentication");
const {
  updatePassword,
  updateUser,
  deleteUser,
  becomePaidUser,
} = require("../controllers/userController");

router.route("/updatePassword").patch(authenticate, updatePassword);
router.route("/updateUser").patch(authenticate, updateUser);
router.route("/").delete(authenticate, deleteUser);
router.route("/subscribe").patch(authenticate, becomePaidUser);

module.exports = router;
