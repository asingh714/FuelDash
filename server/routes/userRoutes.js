const express = require("express");
const router = express.Router();

const { authenticate } = require("../middleware/authentication");
const {
  getUserProfile,
  updatePassword,
  updateUser,
  deleteUser,
  becomePaidUser,
} = require("../controllers/userController");

router.route("/").get(authenticate, getUserProfile);
router.route("/updatePassword").patch(authenticate, updatePassword);
router.route("/updateUser").patch(authenticate, updateUser);
router.route("/subscribe").patch(authenticate, becomePaidUser);
router.route("/:userId").delete(authenticate, deleteUser);

module.exports = router;
