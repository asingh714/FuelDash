const GasolineProduct = require("../models/GasolineProduct");
const NonGasolineProduct = require("../models/NonGasolineProduct");
const DailySalesMetrics = require("../models/DailySalesMetrics");

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
  return "Snacks";
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

function getRandomGasType() {
  const types = ["Premium", "Regular", "E85", "Diesel", "Midgrade"];
  return types[Math.floor(Math.random() * types.length)];
}

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

function getRandomPercentage(min = 0, max = 100) {
  return parseFloat(getRandomValue(min, max));
}

const addDailySalesMetricsForProperties = async (properties) => {
  const today = getTodayDate();

  for (const property of properties) {
    const alreadyExists = await DailySalesMetrics.findOne({
      propertyId: property._id,
      date: today,
    });

    if (!alreadyExists) {
      const gasolineSalesArray = [];
      let gasolineRevenue = 0;
      for (let i = 0; i < 5; i++) {
        const gasType = getRandomGasType();
        const gallonsSold = parseFloat(getRandomValue(100, 1000));
        const priceSoldAt = parseFloat(getRandomValue(2, 5));
        gasolineSalesArray.push({ gasType, gallonsSold, priceSoldAt });
        gasolineRevenue += gallonsSold * priceSoldAt;
      }

      const nonGasolineSalesArray = [];
      let nonGasolineRevenue = 0;
      for (let j = 0; j < 10; j++) {
        const name = getRandomProduct();
        const quantitySold = parseFloat(getRandomValue(1, 100));
        const priceSoldAt = parseFloat(getRandomValue(1, 10));
        nonGasolineSalesArray.push({ name, quantitySold, priceSoldAt });
        nonGasolineRevenue += quantitySold * priceSoldAt;
      }

      const totalRevenue = gasolineRevenue + nonGasolineRevenue;

      const cashPercentage = getRandomPercentage();
      const creditCardPercentage = 100 - cashPercentage;

      const dailyCashPayments = totalRevenue * (cashPercentage / 100);
      const dailyCreditCardPayments =
        totalRevenue * (creditCardPercentage / 100);

      await DailySalesMetrics.create({
        propertyId: property._id,
        date: today,
        totalRevenue: totalRevenue.toFixed(2),
        dailyCashPayments: dailyCashPayments.toFixed(2),
        dailyCreditCardPayments: dailyCreditCardPayments.toFixed(2),
        gasolineSales: gasolineSalesArray,
        nonGasolineSales: nonGasolineSalesArray,
      });
    }
  }
};

module.exports = {
  addDailyGasolineDeliveryForProperties,
  addDailyNonGasolineDeliveryForProperties,
  addDailySalesMetricsForProperties,
};
