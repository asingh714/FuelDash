const NonGasolineProduct = require("../models/NonGasolineProduct");

const getNoneGasolineProducts = async (req, res) => {
  const { propertyId } = req.params;

  try {
    const noneGasolineProducts = await NonGasolineProduct.find({
      propertyId,
    }).sort({ receivedDate: 1 });
    res.status(200).json({ noneGasolineProducts });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

const addNoneGasolineProduct = async (req, res) => {
  const { propertyId } = req.params;

  const { name, category, quantity, costPerItem, receivedDate } = req.body;

  if (!name || !category || !quantity || !costPerItem) {
    return res.status(400).json({
      msg: "Please provide name, category, quantity, cost per item.",
    });
  }

  try {
    const newNoneGasolineProduct = new NonGasolineProduct({
      propertyId,
      name,
      category,
      quantity,
      costPerItem,
      receivedDate,
    });
    await newNoneGasolineProduct.save();
    res.status(201).json({ msg: newNoneGasolineProduct });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

const updateNoneGasolineProduct = async (req, res) => {
  const { id } = req.params; // Now we use id to find the noneGasolineProduct
  const { costPerItem, quantity, name, category, receivedDate } = req.body;

  try {
    // Find the NonGasolineProduct based on _id
    const noneGasolineProduct = await NonGasolineProduct.findById(id);

    if (!noneGasolineProduct) {
      return res.status(404).json({
        msg: `No NonGasolineProduct found for id ${id}`,
      });
    }

    noneGasolineProduct.costPerItem = costPerItem;
    noneGasolineProduct.quantity = quantity;
    noneGasolineProduct.name = name;
    noneGasolineProduct.category = category;
    noneGasolineProduct.receivedDate = receivedDate;

    await noneGasolineProduct.save();

    res.status(200).json({ msg: noneGasolineProduct });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

const deleteNoneGasolineProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const noneGasolineProduct = await NonGasolineProduct.findById(id);

    if (!noneGasolineProduct) {
      return res.status(404).json({
        msg: `No NonGasolineProduct found for id ${id}`,
      });
    }

    await noneGasolineProduct.remove();

    res.status(200).json({ msg: `NonGasolineProduct ${id} deleted.` });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

const updateNonGasolineStocks = async (
  propertyId,
  nonGasolineProductId,
  quantitySold
) => {
  try {
    // Find the non-gasoline product by its ObjectId and associated propertyId
    const nonGasolineProduct = await NonGasolineProduct.findOne({
      _id: nonGasolineProductId,
      propertyId: propertyId,
    });

    if (!nonGasolineProduct) {
      console.log("Non-Gasoline Product not found.");
      return;
    }

    // Deduct sold quantity from existing quantity
    nonGasolineProduct.quantity -= quantitySold;

    // Optionally, you could check for negative stock here
    if (nonGasolineProduct.quantity < 0) {
      console.log("Stock quantity cannot be negative.");
      // Reset to 0 or handle as per your business logic
      nonGasolineProduct.quantity = 0;
    }

    // Save the updated quantity back to the database
    await nonGasolineProduct.save();

    console.log("Non-Gasoline Product stock updated successfully.");
  } catch (error) {
    console.error(
      `An error occurred while updating non-gasoline stocks: ${error.message}`
    );
  }
};

module.exports = {
  getNoneGasolineProducts,
  addNoneGasolineProduct,
  updateNoneGasolineProduct,
  deleteNoneGasolineProduct,
  updateNonGasolineStocks,
};
