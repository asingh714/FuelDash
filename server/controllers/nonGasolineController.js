const NonGasolineProduct = require("../models/NonGasolineProduct");

const getNonGasolineProducts = async (req, res) => {
  const { propertyId } = req.params;

  try {
    const nonGasolineProducts = await NonGasolineProduct.find({
      propertyId,
    }).sort({ receivedDate: 1 });
    res.status(200).json({ nonGasolineProducts });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};


const addNonGasolineProduct = async (req, res) => {
  const { propertyId } = req.params;

  const { name, category, quantity, costPerItem, receivedDate } = req.body;

  if (!name || !category || !quantity || !costPerItem) {
    return res.status(400).json({
      msg: "Please provide name, category, quantity, cost per item.",
    });
  }

  try {
    const newNonGasolineProduct = new NonGasolineProduct({
      propertyId,
      name,
      category,
      quantity,
      costPerItem,
      receivedDate,
    });
    await newNonGasolineProduct.save();
    res.status(201).json({ msg: newNonGasolineProduct });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

const updateNonGasolineProduct = async (req, res) => {
  const { id } = req.params; // Now we use id to find the nonGasolineProduct
  const { costPerItem, quantity, name, category, receivedDate } = req.body;

  try {
    // Find the NonGasolineProduct based on _id
    const nonGasolineProduct = await NonGasolineProduct.findById(id);

    if (!nonGasolineProduct) {
      return res.status(404).json({
        msg: `No NonGasolineProduct found for id ${id}`,
      });
    }

    nonGasolineProduct.costPerItem = costPerItem;
    nonGasolineProduct.quantity = quantity;
    nonGasolineProduct.name = name;
    nonGasolineProduct.category = category;
    nonGasolineProduct.receivedDate = receivedDate;

    await nonGasolineProduct.save();

    res.status(200).json({ msg: nonGasolineProduct });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

const deleteNonGasolineProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const nonGasolineProduct = await NonGasolineProduct.findById(id);

    if (!nonGasolineProduct) {
      return res.status(404).json({
        msg: `No NonGasolineProduct found for id ${id}`,
      });
    }

    await nonGasolineProduct.remove();

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
  getNonGasolineProducts,
  addNonGasolineProduct,
  updateNonGasolineProduct,
  deleteNonGasolineProduct,
  updateNonGasolineStocks,
  getgodmode,
};
