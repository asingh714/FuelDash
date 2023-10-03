const Property = require("../models/Property");
const mongoose = require("mongoose");

const getProperties = async (req, res) => {
  const userId = req.user.userId;

  try {
    const properties = await Property.find({ userId });
    res.status(200).json({ properties });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

const getSingleProperty = async (req, res) => {
  const userId = req.user.userId;
  const { id: propertyId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(propertyId)) {
    return res.status(400).json({ msg: "Invalid property id" });
  }

  try {
    const property = await Property.findOne({ userId, _id: propertyId });
    if (!property) {
      return res.status(404).json({ msg: "Property not found" });
    }
    res.status(200).json({ property });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

const addProperty = async (req, res) => {
  const userId = req.user.userId;
  const subscriptionStatus = req.user.subscriptionStatus;
  console.log("subscriptionStatus", subscriptionStatus);

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

const updateProperty = async (req, res) => {
  const userId = req.user.userId;
  const { id: propertyId } = req.params;
  const { name, address } = req.body;

  if (!name || !address) {
    return res.status(400).json({ msg: "Please provide name and address" });
  }

  if (!mongoose.Types.ObjectId.isValid(propertyId)) {
    return res.status(400).json({ msg: "Invalid property id" });
  }

  try {
    const property = await Property.findOne({ userId, _id: propertyId });
    if (!property) {
      return res.status(404).json({ msg: "Property not found" });
    }
    property.name = name;
    property.address = address;
    await property.save();
    res.status(200).json({ property });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

const deleteProperty = async (req, res) => {
  const userId = req.user.userId;
  const { id: propertyId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(propertyId)) {
    return res.status(400).json({ msg: "Invalid property id" });
  }

  try {
    const property = await Property.findOne({ userId, _id: propertyId });
    if (!property) {
      return res.status(404).json({ msg: "Property not found" });
    }

    await property.deleteOne({ _id: propertyId });
    res.status(200).json({ msg: "Property deleted" });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

module.exports = {
  getProperties,
  addProperty,
  getSingleProperty,
  updateProperty,
  deleteProperty,
};
