const GasolineProduct = require("../models/GasolineProduct");
const NonGasolineProduct = require("../models/NonGasolineProduct");

function getRandomValue(min, max) {
  return (Math.random() * (max - min) + min).toFixed(2);
}

function getRandomGasType() {
  const types = ["Premium", "Regular", "E85", "Diesel", "Midgrade"];
  return types[Math.floor(Math.random() * types.length)];
}

function getTodayDate() {
  const date = new Date();
  return `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(
    2,
    "0"
  )}-${String(date.getUTCDate()).padStart(2, "0")}T00:00:00Z`;
}

const addDailyGasolineDeliveryForProperties = async (properties) => {
  const today = getTodayDate();

  for (const property of properties) {
    const alreadyExists = await GasolineProduct.findOne({
      propertyId: property._id,
      receivedDate: today,
    });

    if (!alreadyExists) {
      const gasType = getRandomGasType();
      const quantityInGallons = getRandomValue(2500, 8000);
      const costPerGallon = getRandomValue(2, 3.5);
      await GasolineProduct.create({
        propertyId: property._id,
        gasType: gasType,
        quantityInGallons: parseFloat(quantityInGallons),
        costPerGallon: parseFloat(costPerGallon),
        receivedDate: today,
      });
    }
  }
};

function getRandomProduct() {
  const products = [
    "Beef Jerky",
    "Bread",
    "Cheese",
    "Chewing Gum",
    "Chocolate Bar",
    "Cigarettes",
    "Coca-Cola",
    "Engine Oil",
    "Juice Box",
    "Magazine",
    "Milk",
    "Motorcycle Oil",
    "Potato Chips",
    "Shampoo",
    "Soap",
    "Sunglasses",
    "Toothpaste",
    "Travel Pillow",
    "Water Bottle",
    "Windshield Wiper Fluid",
  ];
  return products[Math.floor(Math.random() * products.length)];
}

function getRandomCategory(product) {
  const categories = {
    Beverages: ["Coca-Cola", "Juice Box", "Milk", "Water Bottle"],
    Snacks: ["Beef Jerky", "Bread", "Cheese", "Chocolate Bar", "Potato Chips"],
    "Tobacco Products": ["Cigarettes"],
    "Automotive Supplies": [
      "Engine Oil",
      "Motorcycle Oil",
      "Windshield Wiper Fluid",
    ],
    Groceries: ["Bread", "Cheese", "Milk"],
    "Health & Beauty": ["Shampoo", "Soap", "Toothpaste"],
    "Travel and Leisure": ["Magazine", "Sunglasses", "Travel Pillow"],
  };

  for (const category in categories) {
    if (categories[category].includes(product)) return category;
  }

  console.error(
    `No category found for product: ${product}. Defaulting to "Snacks".`
  );
  return "Snacks"; // Default category
}

const addDailyNonGasolineDeliveryForProperties = async (properties) => {
  const today = getTodayDate();

  for (const property of properties) {
    const productName = getRandomProduct();
    const category = getRandomCategory(productName);
    const alreadyExists = await NonGasolineProduct.findOne({
      propertyId: property._id,
      name: productName,
      receivedDate: today,
    });

    if (!alreadyExists) {
      const quantity = Math.floor(getRandomValue(50, 500));
      const costPerItem = getRandomValue(0.5, 10);
      await NonGasolineProduct.create({
        propertyId: property._id,
        name: productName,
        category: category,
        quantity: quantity,
        costPerItem: parseFloat(costPerItem),
        receivedDate: today,
      });
    }
  }
};

module.exports = {
  addDailyGasolineDeliveryForProperties,
  addDailyNonGasolineDeliveryForProperties,
};
