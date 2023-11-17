const EmailSubscriber = require("../models/EmailSubscriber");
const ContactInfo = require("../models/ContactInfo");
const validator = require("validator");

const registerSubscriber = async (req, res) => {
  const { email } = req.body;

  const isEmailValid = validator.isEmail(email);
  if (!email || !isEmailValid) {
    return res.status(400).json({ msg: "Please provide a valid email" });
  }
  const emailAlreadyExists = await EmailSubscriber.findOne({ email });

  if (emailAlreadyExists) {
    return res.status(400).json({ msg: "Email already exists" });
  }

  try {
    const subscriber = new EmailSubscriber({
      email: email.trim().toLowerCase(),
    });
    await subscriber.save();
    res.status(201).json({ subscriber });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const registerContactInfo = async (req, res) => {
  const { firstName, lastName, email, message } = req.body;

  if (!firstName || !lastName || !message) {
    return res.status(400).json({
      msg: "Please provide your name, email and a message",
    });
  }

  const isEmailValid = validator.isEmail(email);
  if (!email || !isEmailValid) {
    return res.status(400).json({ msg: "Please provide a valid email" });
  }

  try {
    const contactInfo = new ContactInfo({
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim().toLowerCase(),
      message: message.trim(),
    });
    await contactInfo.save();
    res.status(201).json({ contactInfo });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const getAllSubscribers = async (req, res) => {
  try {
    const subscribers = await EmailSubscriber.find({});
    res.status(200).json({ subscribers });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

module.exports = {
  registerSubscriber,
  getAllSubscribers,
  registerContactInfo,
};
