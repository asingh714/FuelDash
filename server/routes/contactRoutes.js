const express = require("express");
const router = express.Router();

const {
  registerSubscriber,
  getAllSubscribers,
  registerContactInfo,
} = require("../controllers/contactController");

router.get("/subscribe", getAllSubscribers);
router.post("/subcribe", registerSubscriber);
router.post("/register", registerContactInfo);

module.exports = router;
