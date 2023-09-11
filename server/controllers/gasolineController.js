const GasolineProduct = require("../models/GasolineProduct");

const getGasolineProducts = async (req, res) => {
  const { propertyId } = req.params;

  try {
    const gasolineProducts = await GasolineProduct.find({
      propertyId
    }).sort({ receivedDate: 1 });
    res.status(200).json({ gasolineProducts });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

const addGasolineProduct = async (req, res) => {
  const { propertyId } = req.params;

  const { gasType, quantityInGallons, costPerGallon, receivedDate } = req.body;

  if (!gasType || !quantityInGallons || !costPerGallon) {
    return res.status(400).json({
      msg: "Please provide gas type, quantity in gallons, cost per gallon.",
    });
  }

  try {
    const newGasolineProduct = new GasolineProduct({
      propertyId: 
      gasType,
      quantityInGallons,
      costPerGallon,
      receivedDate,
    });
    await newGasolineProduct.save();
    res.status(201).json({ msg: newGasolineProduct });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

const updateGasolineProduct = async (req, res) => {
  const { id } = req.params; // Now we use id to find the gasolineProduct
  const { costPerGallon, quantityInGallons, gasType, receivedDate } = req.body;

  try {
    // Find the GasolineProduct based on _id
    const gasolineProduct = await GasolineProduct.findById(id);

    if (!gasolineProduct) {
      return res.status(404).json({
        msg: `No GasolineProduct found for id ${id}`,
      });
    }

    gasolineProduct.costPerGallon = costPerGallon;
    gasolineProduct.quantityInGallons = quantityInGallons;
    gasolineProduct.gasType = gasType;
    gasolineProduct.receivedDate = receivedDate;

    await gasolineProduct.save();

    res.status(200).json({ gasolineProduct });
  } catch (error) {
    console.error("An error occurred:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const deleteGasolineProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const gasolineProduct = await GasolineProduct.findById(id);

    if (!gasolineProduct) {
      return res.status(404).json({
        msg: `No GasolineProduct found for id ${id}`,
      });
    }
    const deletedGasolineProduct = await GasolineProduct.findByIdAndDelete(id);
    res.status(200).json({ deleted: deletedGasolineProduct });
  } catch (error) {
    console.error("An error occurred:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateGasolineBatches = async (propertyId, gasType, gallonsSold) => {
  try {
    // Find the GasolineProduct based on propertyId and gasType, sorted by receivedDate
    const gasolineProducts = await GasolineProduct.find({
      propertyId,
      gasType,
    }).sort({ receivedDate: 1 });

    if (gasolineProducts.length === 0) {
      throw new Error(
        `No GasolineProduct found for propertyId ${propertyId} and gasType ${gasType}`
      );
    }

    let remainingGallonsToDeduct = gallonsSold;

    for (const gasolineProduct of gasolineProducts) {
      if (gasolineProduct.quantityInGallons >= remainingGallonsToDeduct) {
        gasolineProduct.quantityInGallons -= remainingGallonsToDeduct;
        remainingGallonsToDeduct = 0;
      } else {
        remainingGallonsToDeduct -= gasolineProduct.quantityInGallons;
        gasolineProduct.quantityInGallons = 0;
      }

      await gasolineProduct.save();

      if (remainingGallonsToDeduct <= 0) break;
    }

    if (remainingGallonsToDeduct > 0) {
      throw new Error(
        `Not enough inventory for propertyId ${propertyId} and gasType ${gasType}. Remaining: ${remainingGallonsToDeduct}`
      );
    }
  } catch (error) {
    console.error(
      `An error occurred in updateGasolineBatches: ${error.message}`
    );
    throw error;
  }
};

module.exports = {
  getGasolineProducts,
  addGasolineProduct,
  deleteGasolineProduct,
  updateGasolineProduct,
  updateGasolineBatches,
};
