const fs = require("fs");
const path = require("path");

const dataPath = path.join(__dirname, "../data.json");
function addGasDelivery() {
  // Load the existing data
  let data = JSON.parse(fs.readFileSync(dataPath));

  // Get the current date
  let currentDate = new Date().toISOString().split("T")[0];

  // Define the gas types
  let gasTypes = ["Regular", "Diesel", "Midgrade", "Premium", "E85"];

  // Iterate over each property
  data.Properties.forEach((property) => {
    // Check if there is already a gas delivery for this property today
    let existingDelivery = data.GasolineProducts.find(
      (product) =>
        product.propertyId === property._id &&
        product.receivedDate === currentDate
    );

    // If there is no existing delivery, add a new one
    if (!existingDelivery) {
      // Generate a random quantity and cost for each gas type
      gasTypes.forEach((gasType) => {
        let newGasDelivery = {
          propertyId: property._id,
          gasType: gasType,
          quantityInGallons:
            Math.floor(Math.random() * (6000 - 1000 + 1)) + 1000, // Random quantity between 1000 and 6000
          costPerGallon:
            Math.round((Math.random() * (3.5 - 2.0) + 2.0) * 100) / 100, // Random cost between 2.0 and 3.5
          receivedDate: currentDate,
        };

        // Add the new gas delivery to the GasolineProducts list
        data.GasolineProducts.push(newGasDelivery);
      });
    }
  });

  // Save the updated data
  fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
}

module.exports = { addGasDelivery };
