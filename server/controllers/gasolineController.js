const GasolineProduct = require("../models/GasolineProduct");

const getGasolineProducts = async (req, res) => {
  const id = req.params.id;

  try {
    const gasolineProducts = await GasolineProduct.find({ propertyId: id });
    res.status(200).json({ gasolineProducts });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

const addGasolineProduct = async (req, res) => {
  const id = req.params.id;

  const { gasType, quantityInGallons, costPerGallon, receivedDate } = req.body;

  if (!gasType || !quantityInGallons || !costPerGallon) {
    return res.status(400).json({
      msg: "Please provide gas type, quantity in gallons, cost per gallon.",
    });
  }

  try {
    const newGasolineProduct = new GasolineProduct({
      propertyId: id,
      gasType,
      batches: [{ quantityInGallons, costPerGallon, receivedDate }],
    });
    await newGasolineProduct.save();
    res.status(201).json({ msg: newGasolineProduct });
  } catch (error) {
    return res.status(500).json({ msg: error.message });
  }
};

const updateGasolineBatches = async (propertyId, gasType, gallonsSold) => {
  // Find the GasolineProduct based on propertyId and gasType
  const gasolineProducts = await GasolineProduct.find({
    propertyId,
    gasType,
  }).sort({ "batches.receivedDate": 1 });

  if (gasolineProducts.length === 0) {
    throw new Error(
      `No GasolineProduct found for propertyId ${propertyId} and gasType ${gasType}`
    );
  }

  let remainingGallonsToDeduct = gallonsSold;

  for (const gasolineProduct of gasolineProducts) {
    for (
      let i = 0;
      i < gasolineProduct.batches.length && remainingGallonsToDeduct > 0;
      i++
    ) {
      let batch = gasolineProduct.batches[i];

      if (batch.quantityInGallons >= remainingGallonsToDeduct) {
        batch.quantityInGallons -= remainingGallonsToDeduct;
        remainingGallonsToDeduct = 0;
      } else {
        remainingGallonsToDeduct -= batch.quantityInGallons;
        batch.quantityInGallons = 0;
      }

      if (batch.quantityInGallons === 0) {
        gasolineProduct.batches.splice(i, 1);
        i--;
      }
    }

    await gasolineProduct.save();
    
    if (gasolineProduct.batches.length === 0) {
      await GasolineProduct.findByIdAndDelete(gasolineProduct._id);
    }

    if (remainingGallonsToDeduct <= 0) break;
  }

  if (remainingGallonsToDeduct > 0) {
    throw new Error(
      `Not enough inventory for propertyId ${propertyId} and gasType ${gasType}. Remaining: ${remainingGallonsToDeduct}`
    );
  }
};
module.exports = {
  getGasolineProducts,
  addGasolineProduct,
  updateGasolineBatches,
};
