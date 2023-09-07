const Property = require("../models/Property");

const getProperties = async (req, res) => {
  const userId = req.user.userId;

  try {
    const properties = await Property.find({ userId });
    res.status(200).json({ properties });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};


const addProperty = async (req, res) => {
  const userId = req.user.userId;
  const subscriptionStatus = req.user.subscriptionStatus;

  const { name, address } = req.body;

  if (!name || !address) {
    return res.status(400).json({ msg: "Please provide name and address" });
  }

  if (subscriptionStatus === "Free") {
    const properties = await Property.find({ userId });
    if (properties.length >= 3) {
      return res
        .status(400)
        .json({ msg: "You have reached the maximum number of properties" });
    }
  }
  try {
    const newProperty = new Property({ userId, name, address });
    await newProperty.save();
    res.status(201).json({ msg: newProperty });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

module.exports = {
  getProperties,
  addProperty,
};
