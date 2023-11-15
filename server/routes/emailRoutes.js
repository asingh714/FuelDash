const express = require("express");
const router = express.Router();

const {
  registerSubscriber,
  getAllSubscribers,
} = require("../controllers/emailController");

router.get("/", getAllSubscribers);
router.post("/", registerSubscriber);

module.exports = router;
