const mongoose = require("mongoose");
const GasolineProduct = require("../models/GasolineProduct");
const NonGasolineProduct = require("../models/NonGasolineProduct");

// 40
const GasolineProducts = [
  {
    propertyId: "64ff54a2b485b42210278310",
    gasType: "Regular",
    quantityInGallons: 5000,
    costPerGallon: 2.5,
    receivedDate: "2023-09-03T20:02:48.710Z",
  },
  {
    propertyId: "64ff54a2b485b42210278310",
    gasType: "Diesel",
    quantityInGallons: 2000,
    costPerGallon: 3.0,
    receivedDate: "2023-09-04T20:02:48.710Z",
  },
  {
    propertyId: "64ff54a2b485b42210278310",
    gasType: "Midgrade",
    quantityInGallons: 3500,
    costPerGallon: 2.8,
    receivedDate: "2023-09-05T20:02:48.710Z",
  },
  {
    propertyId: "64ff54a2b485b42210278310",
    gasType: "Premium",
    quantityInGallons: 2500,
    costPerGallon: 3.2,
    receivedDate: "2023-09-06T20:02:48.710Z",
  },
  {
    propertyId: "64ff54a2b485b42210278310",
    gasType: "E85",
    quantityInGallons: 1500,
    costPerGallon: 2.2,
    receivedDate: "2023-09-07T20:02:48.710Z",
  },
  {
    propertyId: "64ff54a2b485b42210278310",
    gasType: "Regular",
    quantityInGallons: 5200,
    costPerGallon: 2.55,
    receivedDate: "2023-09-08T20:02:48.710Z",
  },
  {
    propertyId: "64ff54a2b485b42210278310",
    gasType: "Diesel",
    quantityInGallons: 2100,
    costPerGallon: 3.1,
    receivedDate: "2023-09-09T20:02:48.710Z",
  },
  {
    propertyId: "64ff54a2b485b42210278310",
    gasType: "Midgrade",
    quantityInGallons: 3600,
    costPerGallon: 2.9,
    receivedDate: "2023-09-10T20:02:48.710Z",
  },
  {
    propertyId: "64ff54aeb485b42210278312",
    gasType: "Regular",
    quantityInGallons: 4000,
    costPerGallon: 2.6,
    receivedDate: "2023-09-03T20:02:48.710Z",
  },
  {
    propertyId: "64ff54aeb485b42210278312",
    gasType: "Diesel",
    quantityInGallons: 2500,
    costPerGallon: 2.9,
    receivedDate: "2023-09-04T20:02:48.710Z",
  },
  {
    propertyId: "64ff54aeb485b42210278312",
    gasType: "Midgrade",
    quantityInGallons: 3000,
    costPerGallon: 2.8,
    receivedDate: "2023-09-05T20:02:48.710Z",
  },
  {
    propertyId: "64ff54aeb485b42210278312",
    gasType: "Premium",
    quantityInGallons: 1500,
    costPerGallon: 3.1,
    receivedDate: "2023-09-06T20:02:48.710Z",
  },
  {
    propertyId: "64ff54aeb485b42210278312",
    gasType: "E85",
    quantityInGallons: 2000,
    costPerGallon: 2.2,
    receivedDate: "2023-09-07T20:02:48.710Z",
  },
  {
    propertyId: "64ff54aeb485b42210278312",
    gasType: "Regular",
    quantityInGallons: 4200,
    costPerGallon: 2.5,
    receivedDate: "2023-09-08T20:02:48.710Z",
  },
  {
    propertyId: "64ff54aeb485b42210278312",
    gasType: "Diesel",
    quantityInGallons: 2600,
    costPerGallon: 3.0,
    receivedDate: "2023-09-09T20:02:48.710Z",
  },
  {
    propertyId: "64ff54aeb485b42210278312",
    gasType: "Midgrade",
    quantityInGallons: 2800,
    costPerGallon: 2.7,
    receivedDate: "2023-09-10T20:02:48.710Z",
  },
  {
    propertyId: "64ff54b8b485b42210278314",
    gasType: "Regular",
    quantityInGallons: 4500,
    costPerGallon: 2.7,
    receivedDate: "2023-09-03T20:02:48.710Z",
  },
  {
    propertyId: "64ff54b8b485b42210278314",
    gasType: "Diesel",
    quantityInGallons: 2200,
    costPerGallon: 3.2,
    receivedDate: "2023-09-04T20:02:48.710Z",
  },
  {
    propertyId: "64ff54b8b485b42210278314",
    gasType: "Midgrade",
    quantityInGallons: 3100,
    costPerGallon: 3.0,
    receivedDate: "2023-09-05T20:02:48.710Z",
  },
  {
    propertyId: "64ff54b8b485b42210278314",
    gasType: "Premium",
    quantityInGallons: 1700,
    costPerGallon: 3.5,
    receivedDate: "2023-09-06T20:02:48.710Z",
  },
  {
    propertyId: "64ff54b8b485b42210278314",
    gasType: "E85",
    quantityInGallons: 1800,
    costPerGallon: 2.3,
    receivedDate: "2023-09-07T20:02:48.710Z",
  },
  {
    propertyId: "64ff54b8b485b42210278314",
    gasType: "Regular",
    quantityInGallons: 4600,
    costPerGallon: 2.8,
    receivedDate: "2023-09-08T20:02:48.710Z",
  },
  {
    propertyId: "64ff54b8b485b42210278314",
    gasType: "Diesel",
    quantityInGallons: 2300,
    costPerGallon: 3.1,
    receivedDate: "2023-09-09T20:02:48.710Z",
  },
  {
    propertyId: "64ff54b8b485b42210278314",
    gasType: "Midgrade",
    quantityInGallons: 3200,
    costPerGallon: 2.9,
    receivedDate: "2023-09-10T20:02:48.710Z",
  },
  {
    propertyId: "64ff54c0b485b42210278316",
    gasType: "Regular",
    quantityInGallons: 4700,
    costPerGallon: 2.6,
    receivedDate: "2023-09-03T20:02:48.710Z",
  },
  {
    propertyId: "64ff54c0b485b42210278316",
    gasType: "Diesel",
    quantityInGallons: 2100,
    costPerGallon: 3.4,
    receivedDate: "2023-09-04T20:02:48.710Z",
  },
  {
    propertyId: "64ff54c0b485b42210278316",
    gasType: "Midgrade",
    quantityInGallons: 3000,
    costPerGallon: 2.9,
    receivedDate: "2023-09-05T20:02:48.710Z",
  },
  {
    propertyId: "64ff54c0b485b42210278316",
    gasType: "Premium",
    quantityInGallons: 1600,
    costPerGallon: 3.3,
    receivedDate: "2023-09-06T20:02:48.710Z",
  },
  {
    propertyId: "64ff54c0b485b42210278316",
    gasType: "E85",
    quantityInGallons: 1900,
    costPerGallon: 2.4,
    receivedDate: "2023-09-07T20:02:48.710Z",
  },
  {
    propertyId: "64ff54c0b485b42210278316",
    gasType: "Regular",
    quantityInGallons: 4800,
    costPerGallon: 2.7,
    receivedDate: "2023-09-08T20:02:48.710Z",
  },
  {
    propertyId: "64ff54c0b485b42210278316",
    gasType: "Diesel",
    quantityInGallons: 2200,
    costPerGallon: 3.3,
    receivedDate: "2023-09-09T20:02:48.710Z",
  },
  {
    propertyId: "64ff54c0b485b42210278316",
    gasType: "Midgrade",
    quantityInGallons: 3100,
    costPerGallon: 3.0,
    receivedDate: "2023-09-10T20:02:48.710Z",
  },
  {
    propertyId: "64ff54c8b485b42210278318",
    gasType: "Regular",
    quantityInGallons: 4600,
    costPerGallon: 2.8,
    receivedDate: "2023-09-03T20:02:48.710Z",
  },
  {
    propertyId: "64ff54c8b485b42210278318",
    gasType: "Diesel",
    quantityInGallons: 1800,
    costPerGallon: 3.2,
    receivedDate: "2023-09-04T20:02:48.710Z",
  },
  {
    propertyId: "64ff54c8b485b42210278318",
    gasType: "Midgrade",
    quantityInGallons: 2500,
    costPerGallon: 3.1,
    receivedDate: "2023-09-05T20:02:48.710Z",
  },
  {
    propertyId: "64ff54c8b485b42210278318",
    gasType: "Premium",
    quantityInGallons: 1700,
    costPerGallon: 3.6,
    receivedDate: "2023-09-06T20:02:48.710Z",
  },
  {
    propertyId: "64ff54c8b485b42210278318",
    gasType: "E85",
    quantityInGallons: 2000,
    costPerGallon: 2.2,
    receivedDate: "2023-09-07T20:02:48.710Z",
  },
  {
    propertyId: "64ff54c8b485b42210278318",
    gasType: "Regular",
    quantityInGallons: 4300,
    costPerGallon: 2.9,
    receivedDate: "2023-09-08T20:02:48.710Z",
  },
  {
    propertyId: "64ff54c8b485b42210278318",
    gasType: "Diesel",
    quantityInGallons: 1900,
    costPerGallon: 3.5,
    receivedDate: "2023-09-09T20:02:48.710Z",
  },
  {
    propertyId: "64ff54c8b485b42210278318",
    gasType: "Midgrade",
    quantityInGallons: 2600,
    costPerGallon: 3.2,
    receivedDate: "2023-09-10T20:02:48.710Z",
  },
];

const NonGasolineProducts = [
  {
    propertyId: "64ff54a2b485b42210278310",
    name: "Coca-Cola",
    category: "Beverages",
    quantity: 50,
    costPerItem: 1.5,
    receivedDate: "2023-09-01T12:00:00.000Z",
  },
  {
    propertyId: "64ff54a2b485b42210278310",
    name: "Potato Chips",
    category: "Snacks",
    quantity: 30,
    costPerItem: 1.0,
    receivedDate: "2023-09-02T14:00:00.000Z",
  },
  {
    propertyId: "64ff54a2b485b42210278310",
    name: "Cigarettes",
    category: "Tobacco Products",
    quantity: 20,
    costPerItem: 5.0,
    receivedDate: "2023-09-02T16:00:00.000Z",
  },
  {
    propertyId: "64ff54a2b485b42210278310",
    name: "Windshield Wiper Fluid",
    category: "Automotive Supplies",
    quantity: 15,
    costPerItem: 3.0,
    receivedDate: "2023-09-03T09:00:00.000Z",
  },
  {
    propertyId: "64ff54a2b485b42210278310",
    name: "Shampoo",
    category: "Health & Beauty",
    quantity: 25,
    costPerItem: 4.0,
    receivedDate: "2023-09-04T10:00:00.000Z",
  },
  {
    propertyId: "64ff54a2b485b42210278310",
    name: "Sunglasses",
    category: "Travel and Leisure",
    quantity: 12,
    costPerItem: 10.0,
    receivedDate: "2023-09-04T15:00:00.000Z",
  },
  {
    propertyId: "64ff54a2b485b42210278310",
    name: "Bread",
    category: "Groceries",
    quantity: 20,
    costPerItem: 2.5,
    receivedDate: "2023-09-05T08:00:00.000Z",
  },
  {
    propertyId: "64ff54a2b485b42210278310",
    name: "Water Bottle",
    category: "Beverages",
    quantity: 40,
    costPerItem: 1.2,
    receivedDate: "2023-09-07T11:00:00.000Z",
  },
  {
    propertyId: "64ff54a2b485b42210278310",
    name: "Chocolate Bar",
    category: "Snacks",
    quantity: 25,
    costPerItem: 1.5,
    receivedDate: "2023-09-07T12:30:00.000Z",
  },
  {
    propertyId: "64ff54a2b485b42210278310",
    name: "Toothpaste",
    category: "Health & Beauty",
    quantity: 15,
    costPerItem: 2.5,
    receivedDate: "2023-09-08T09:00:00.000Z",
  },
  {
    propertyId: "64ff54a2b485b42210278310",
    name: "Engine Oil",
    category: "Automotive Supplies",
    quantity: 12,
    costPerItem: 8.0,
    receivedDate: "2023-09-08T13:00:00.000Z",
  },
  {
    propertyId: "64ff54a2b485b42210278310",
    name: "Magazine",
    category: "Travel and Leisure",
    quantity: 10,
    costPerItem: 5.0,
    receivedDate: "2023-09-09T15:00:00.000Z",
  },
  {
    propertyId: "64ff54a2b485b42210278310",
    name: "Milk",
    category: "Groceries",
    quantity: 20,
    costPerItem: 2.2,
    receivedDate: "2023-09-09T16:30:00.000Z",
  },
  {
    propertyId: "64ff54a2b485b42210278310",
    name: "Soap",
    category: "Health & Beauty",
    quantity: 30,
    costPerItem: 1.3,
    receivedDate: "2023-09-10T09:00:00.000Z",
  },
  {
    propertyId: "64ff54a2b485b42210278310",
    name: "Motorcycle Oil",
    category: "Automotive Supplies",
    quantity: 7,
    costPerItem: 10.0,
    receivedDate: "2023-09-10T11:00:00.000Z",
  },
  {
    propertyId: "64ff54a2b485b42210278310",
    name: "Juice Box",
    category: "Beverages",
    quantity: 35,
    costPerItem: 1.0,
    receivedDate: "2023-09-11T10:00:00.000Z",
  },
  {
    propertyId: "64ff54a2b485b42210278310",
    name: "Beef Jerky",
    category: "Snacks",
    quantity: 18,
    costPerItem: 3.5,
    receivedDate: "2023-09-11T12:00:00.000Z",
  },
  {
    propertyId: "64ff54a2b485b42210278310",
    name: "Travel Pillow",
    category: "Travel and Leisure",
    quantity: 10,
    costPerItem: 12.0,
    receivedDate: "2023-09-11T14:00:00.000Z",
  },
  {
    propertyId: "64ff54a2b485b42210278310",
    name: "Cheese",
    category: "Groceries",
    quantity: 15,
    costPerItem: 2.8,
    receivedDate: "2023-09-11T16:00:00.000Z",
  },
  {
    propertyId: "64ff54a2b485b42210278310",
    name: "Chewing Gum",
    category: "Snacks",
    quantity: 50,
    costPerItem: 0.9,
    receivedDate: "2023-09-11T18:00:00.000Z",
  },
  {
    propertyId: "64ff54aeb485b42210278312",
    name: "Coca-Cola",
    category: "Beverages",
    quantity: 24,
    costPerItem: 1.5,
    receivedDate: "2023-09-11T12:00:00.000Z",
  },
  {
    propertyId: "64ff54aeb485b42210278312",
    name: "Potato Chips",
    category: "Snacks",
    quantity: 65,
    costPerItem: 1.0,
    receivedDate: "2023-09-10T14:00:00.000Z",
  },
  {
    propertyId: "64ff54aeb485b42210278312",
    name: "Cigarettes",
    category: "Tobacco Products",
    quantity: 30,
    costPerItem: 5.0,
    receivedDate: "2023-09-09T16:00:00.000Z",
  },
  {
    propertyId: "64ff54aeb485b42210278312",
    name: "Windshield Wiper Fluid",
    category: "Automotive Supplies",
    quantity: 15,
    costPerItem: 3.0,
    receivedDate: "2023-09-08T09:00:00.000Z",
  },
  {
    propertyId: "64ff54aeb485b42210278312",
    name: "Shampoo",
    category: "Health & Beauty",
    quantity: 25,
    costPerItem: 4.0,
    receivedDate: "2023-09-07T10:00:00.000Z",
  },
  {
    propertyId: "64ff54aeb485b42210278312",
    name: "Sunglasses",
    category: "Travel and Leisure",
    quantity: 10,
    costPerItem: 10.0,
    receivedDate: "2023-09-06T15:00:00.000Z",
  },
  {
    propertyId: "64ff54aeb485b42210278312",
    name: "Bread",
    category: "Groceries",
    quantity: 45,
    costPerItem: 2.5,
    receivedDate: "2023-09-05T08:00:00.000Z",
  },
  {
    propertyId: "64ff54aeb485b42210278312",
    name: "Water Bottle",
    category: "Beverages",
    quantity: 40,
    costPerItem: 1.2,
    receivedDate: "2023-09-07T11:00:00.000Z",
  },
  {
    propertyId: "64ff54aeb485b42210278312",
    name: "Chocolate Bar",
    category: "Snacks",
    quantity: 25,
    costPerItem: 1.5,
    receivedDate: "2023-09-07T12:30:00.000Z",
  },
  {
    propertyId: "64ff54aeb485b42210278312",
    name: "Toothpaste",
    category: "Health & Beauty",
    quantity: 20,
    costPerItem: 2.5,
    receivedDate: "2023-09-08T09:00:00.000Z",
  },
  {
    propertyId: "64ff54aeb485b42210278312",
    name: "Engine Oil",
    category: "Automotive Supplies",
    quantity: 12,
    costPerItem: 8.0,
    receivedDate: "2023-09-08T13:00:00.000Z",
  },
  {
    propertyId: "64ff54aeb485b42210278312",
    name: "Magazine",
    category: "Travel and Leisure",
    quantity: 10,
    costPerItem: 5.0,
    receivedDate: "2023-09-09T15:00:00.000Z",
  },
  {
    propertyId: "64ff54aeb485b42210278312",
    name: "Milk",
    category: "Groceries",
    quantity: 20,
    costPerItem: 2.2,
    receivedDate: "2023-09-09T16:30:00.000Z",
  },
  {
    propertyId: "64ff54aeb485b42210278312",
    name: "Soap",
    category: "Health & Beauty",
    quantity: 30,
    costPerItem: 1.3,
    receivedDate: "2023-09-10T09:00:00.000Z",
  },
  {
    propertyId: "64ff54aeb485b42210278312",
    name: "Motorcycle Oil",
    category: "Automotive Supplies",
    quantity: 7,
    costPerItem: 10.0,
    receivedDate: "2023-09-10T11:00:00.000Z",
  },
  {
    propertyId: "64ff54aeb485b42210278312",
    name: "Juice Box",
    category: "Beverages",
    quantity: 35,
    costPerItem: 1.0,
    receivedDate: "2023-09-11T10:00:00.000Z",
  },
  {
    propertyId: "64ff54aeb485b42210278312",
    name: "Beef Jerky",
    category: "Snacks",
    quantity: 18,
    costPerItem: 3.5,
    receivedDate: "2023-09-11T12:00:00.000Z",
  },
  {
    propertyId: "64ff54aeb485b42210278312",
    name: "Travel Pillow",
    category: "Travel and Leisure",
    quantity: 10,
    costPerItem: 12.0,
    receivedDate: "2023-09-11T14:00:00.000Z",
  },
  {
    propertyId: "64ff54aeb485b42210278312",
    name: "Cheese",
    category: "Groceries",
    quantity: 15,
    costPerItem: 2.8,
    receivedDate: "2023-09-11T16:00:00.000Z",
  },
  {
    propertyId: "64ff54aeb485b42210278312",
    name: "Chewing Gum",
    category: "Snacks",
    quantity: 50,
    costPerItem: 0.9,
    receivedDate: "2023-09-11T18:00:00.000Z",
  },
  {
    propertyId: "64ff54b8b485b42210278314",
    name: "Coca-Cola",
    category: "Beverages",
    quantity: 24,
    costPerItem: 1.5,
    receivedDate: "2023-09-06T12:00:00.000Z",
  },
  {
    propertyId: "64ff54b8b485b42210278314",
    name: "Potato Chips",
    category: "Snacks",
    quantity: 65,
    costPerItem: 1.0,
    receivedDate: "2023-09-09T14:00:00.000Z",
  },
  {
    propertyId: "64ff54b8b485b42210278314",
    name: "Cigarettes",
    category: "Tobacco Products",
    quantity: 30,
    costPerItem: 5.0,
    receivedDate: "2023-09-08T16:00:00.000Z",
  },
  {
    propertyId: "64ff54b8b485b42210278314",
    name: "Windshield Wiper Fluid",
    category: "Automotive Supplies",
    quantity: 15,
    costPerItem: 3.0,
    receivedDate: "2023-09-08T09:00:00.000Z",
  },
  {
    propertyId: "64ff54b8b485b42210278314",
    name: "Shampoo",
    category: "Health & Beauty",
    quantity: 25,
    costPerItem: 4.0,
    receivedDate: "2023-09-07T10:00:00.000Z",
  },
  {
    propertyId: "64ff54b8b485b42210278314",
    name: "Sunglasses",
    category: "Travel and Leisure",
    quantity: 10,
    costPerItem: 10.0,
    receivedDate: "2023-09-06T15:00:00.000Z",
  },
  {
    propertyId: "64ff54b8b485b42210278314",
    name: "Bread",
    category: "Groceries",
    quantity: 51,
    costPerItem: 2.5,
    receivedDate: "2023-09-05T08:00:00.000Z",
  },
  {
    propertyId: "64ff54b8b485b42210278314",
    name: "Water Bottle",
    category: "Beverages",
    quantity: 40,
    costPerItem: 1.2,
    receivedDate: "2023-09-07T11:00:00.000Z",
  },
  {
    propertyId: "64ff54b8b485b42210278314",
    name: "Chocolate Bar",
    category: "Snacks",
    quantity: 25,
    costPerItem: 1.5,
    receivedDate: "2023-09-07T12:30:00.000Z",
  },
  {
    propertyId: "64ff54b8b485b42210278314",
    name: "Toothpaste",
    category: "Health & Beauty",
    quantity: 12,
    costPerItem: 2.5,
    receivedDate: "2023-09-08T09:00:00.000Z",
  },
  {
    propertyId: "64ff54b8b485b42210278314",
    name: "Engine Oil",
    category: "Automotive Supplies",
    quantity: 12,
    costPerItem: 8.0,
    receivedDate: "2023-09-08T13:00:00.000Z",
  },
  {
    propertyId: "64ff54b8b485b42210278314",
    name: "Magazine",
    category: "Travel and Leisure",
    quantity: 10,
    costPerItem: 5.0,
    receivedDate: "2023-09-09T15:00:00.000Z",
  },
  {
    propertyId: "64ff54b8b485b42210278314",
    name: "Milk",
    category: "Groceries",
    quantity: 20,
    costPerItem: 2.2,
    receivedDate: "2023-09-09T16:30:00.000Z",
  },
  {
    propertyId: "64ff54b8b485b42210278314",
    name: "Soap",
    category: "Health & Beauty",
    quantity: 15,
    costPerItem: 1.3,
    receivedDate: "2023-09-10T09:00:00.000Z",
  },
  {
    propertyId: "64ff54b8b485b42210278314",
    name: "Motorcycle Oil",
    category: "Automotive Supplies",
    quantity: 7,
    costPerItem: 10.0,
    receivedDate: "2023-09-10T11:00:00.000Z",
  },
  {
    propertyId: "64ff54b8b485b42210278314",
    name: "Juice Box",
    category: "Beverages",
    quantity: 35,
    costPerItem: 1.0,
    receivedDate: "2023-09-11T10:00:00.000Z",
  },
  {
    propertyId: "64ff54b8b485b42210278314",
    name: "Beef Jerky",
    category: "Snacks",
    quantity: 18,
    costPerItem: 3.5,
    receivedDate: "2023-09-11T12:00:00.000Z",
  },
  {
    propertyId: "64ff54b8b485b42210278314",
    name: "Travel Pillow",
    category: "Travel and Leisure",
    quantity: 21,
    costPerItem: 12.0,
    receivedDate: "2023-09-11T14:00:00.000Z",
  },
  {
    propertyId: "64ff54b8b485b42210278314",
    name: "Cheese",
    category: "Groceries",
    quantity: 54,
    costPerItem: 2.8,
    receivedDate: "2023-09-11T16:00:00.000Z",
  },
  {
    propertyId: "64ff54b8b485b42210278314",
    name: "Chewing Gum",
    category: "Snacks",
    quantity: 23,
    costPerItem: 0.9,
    receivedDate: "2023-09-11T18:00:00.000Z",
  },
  {
    propertyId: "64ff54c0b485b42210278316",
    name: "Coca-Cola",
    category: "Beverages",
    quantity: 43,
    costPerItem: 1.5,
    receivedDate: "2023-09-06T12:00:00.000Z",
  },
  {
    propertyId: "64ff54c0b485b42210278316",
    name: "Potato Chips",
    category: "Snacks",
    quantity: 23,
    costPerItem: 1.0,
    receivedDate: "2023-09-09T14:00:00.000Z",
  },
  {
    propertyId: "64ff54c0b485b42210278316",
    name: "Cigarettes",
    category: "Tobacco Products",
    quantity: 24,
    costPerItem: 5.0,
    receivedDate: "2023-09-08T16:00:00.000Z",
  },
  {
    propertyId: "64ff54c0b485b42210278316",
    name: "Windshield Wiper Fluid",
    category: "Automotive Supplies",
    quantity: 15,
    costPerItem: 3.0,
    receivedDate: "2023-09-08T09:00:00.000Z",
  },
  {
    propertyId: "64ff54c0b485b42210278316",
    name: "Shampoo",
    category: "Health & Beauty",
    quantity: 25,
    costPerItem: 4.0,
    receivedDate: "2023-09-07T10:00:00.000Z",
  },
  {
    propertyId: "64ff54c0b485b42210278316",
    name: "Sunglasses",
    category: "Travel and Leisure",
    quantity: 10,
    costPerItem: 10.0,
    receivedDate: "2023-09-06T15:00:00.000Z",
  },
  {
    propertyId: "64ff54c0b485b42210278316",
    name: "Bread",
    category: "Groceries",
    quantity: 61,
    costPerItem: 2.5,
    receivedDate: "2023-09-05T08:00:00.000Z",
  },
  {
    propertyId: "64ff54c0b485b42210278316",
    name: "Water Bottle",
    category: "Beverages",
    quantity: 33,
    costPerItem: 1.2,
    receivedDate: "2023-09-07T11:00:00.000Z",
  },
  {
    propertyId: "64ff54c0b485b42210278316",
    name: "Chocolate Bar",
    category: "Snacks",
    quantity: 25,
    costPerItem: 1.5,
    receivedDate: "2023-09-07T12:30:00.000Z",
  },
  {
    propertyId: "64ff54c0b485b42210278316",
    name: "Toothpaste",
    category: "Health & Beauty",
    quantity: 12,
    costPerItem: 2.5,
    receivedDate: "2023-09-08T09:00:00.000Z",
  },
  {
    propertyId: "64ff54c0b485b42210278316",
    name: "Engine Oil",
    category: "Automotive Supplies",
    quantity: 12,
    costPerItem: 8.0,
    receivedDate: "2023-09-08T13:00:00.000Z",
  },
  {
    propertyId: "64ff54c0b485b42210278316",
    name: "Magazine",
    category: "Travel and Leisure",
    quantity: 10,
    costPerItem: 5.0,
    receivedDate: "2023-09-09T15:00:00.000Z",
  },
  {
    propertyId: "64ff54c0b485b42210278316",
    name: "Milk",
    category: "Groceries",
    quantity: 20,
    costPerItem: 2.2,
    receivedDate: "2023-09-09T16:30:00.000Z",
  },
  {
    propertyId: "64ff54c0b485b42210278316",
    name: "Soap",
    category: "Health & Beauty",
    quantity: 15,
    costPerItem: 1.3,
    receivedDate: "2023-09-10T09:00:00.000Z",
  },
  {
    propertyId: "64ff54c0b485b42210278316",
    name: "Motorcycle Oil",
    category: "Automotive Supplies",
    quantity: 7,
    costPerItem: 10.0,
    receivedDate: "2023-09-10T11:00:00.000Z",
  },
  {
    propertyId: "64ff54c0b485b42210278316",
    name: "Juice Box",
    category: "Beverages",
    quantity: 35,
    costPerItem: 1.0,
    receivedDate: "2023-09-11T10:00:00.000Z",
  },
  {
    propertyId: "64ff54c0b485b42210278316",
    name: "Beef Jerky",
    category: "Snacks",
    quantity: 18,
    costPerItem: 3.5,
    receivedDate: "2023-09-11T12:00:00.000Z",
  },
  {
    propertyId: "64ff54c0b485b42210278316",
    name: "Travel Pillow",
    category: "Travel and Leisure",
    quantity: 21,
    costPerItem: 12.0,
    receivedDate: "2023-09-11T14:00:00.000Z",
  },
  {
    propertyId: "64ff54c0b485b42210278316",
    name: "Cheese",
    category: "Groceries",
    quantity: 54,
    costPerItem: 2.8,
    receivedDate: "2023-09-11T16:00:00.000Z",
  },
  {
    propertyId: "64ff54c0b485b42210278316",
    name: "Chewing Gum",
    category: "Snacks",
    quantity: 23,
    costPerItem: 0.9,
    receivedDate: "2023-09-11T18:00:00.000Z",
  },
  {
    propertyId: "64ff54c8b485b42210278318",
    name: "Coca-Cola",
    category: "Beverages",
    quantity: 41,
    costPerItem: 1.5,
    receivedDate: "2023-09-06T12:00:00.000Z",
  },
  {
    propertyId: "64ff54c8b485b42210278318",
    name: "Potato Chips",
    category: "Snacks",
    quantity: 23,
    costPerItem: 1.0,
    receivedDate: "2023-09-09T14:00:00.000Z",
  },
  {
    propertyId: "64ff54c8b485b42210278318",
    name: "Cigarettes",
    category: "Tobacco Products",
    quantity: 25,
    costPerItem: 5.0,
    receivedDate: "2023-09-08T16:00:00.000Z",
  },
  {
    propertyId: "64ff54c8b485b42210278318",
    name: "Windshield Wiper Fluid",
    category: "Automotive Supplies",
    quantity: 15,
    costPerItem: 3.0,
    receivedDate: "2023-09-08T09:00:00.000Z",
  },
  {
    propertyId: "64ff54c8b485b42210278318",
    name: "Shampoo",
    category: "Health & Beauty",
    quantity: 27,
    costPerItem: 4.0,
    receivedDate: "2023-09-07T10:00:00.000Z",
  },
  {
    propertyId: "64ff54c8b485b42210278318",
    name: "Sunglasses",
    category: "Travel and Leisure",
    quantity: 11,
    costPerItem: 10.0,
    receivedDate: "2023-09-06T15:00:00.000Z",
  },
  {
    propertyId: "64ff54c8b485b42210278318",
    name: "Bread",
    category: "Groceries",
    quantity: 79,
    costPerItem: 2.5,
    receivedDate: "2023-09-05T08:00:00.000Z",
  },
  {
    propertyId: "64ff54c8b485b42210278318",
    name: "Water Bottle",
    category: "Beverages",
    quantity: 33,
    costPerItem: 1.2,
    receivedDate: "2023-09-07T11:00:00.000Z",
  },
  {
    propertyId: "64ff54c8b485b42210278318",
    name: "Chocolate Bar",
    category: "Snacks",
    quantity: 25,
    costPerItem: 1.5,
    receivedDate: "2023-09-07T12:30:00.000Z",
  },
  {
    propertyId: "64ff54c8b485b42210278318",
    name: "Toothpaste",
    category: "Health & Beauty",
    quantity: 13,
    costPerItem: 2.5,
    receivedDate: "2023-09-08T09:00:00.000Z",
  },
  {
    propertyId: "64ff54c8b485b42210278318",
    name: "Engine Oil",
    category: "Automotive Supplies",
    quantity: 15,
    costPerItem: 8.0,
    receivedDate: "2023-09-08T13:00:00.000Z",
  },
  {
    propertyId: "64ff54c8b485b42210278318",
    name: "Magazine",
    category: "Travel and Leisure",
    quantity: 9,
    costPerItem: 5.0,
    receivedDate: "2023-09-09T15:00:00.000Z",
  },
  {
    propertyId: "64ff54c8b485b42210278318",
    name: "Milk",
    category: "Groceries",
    quantity: 21,
    costPerItem: 2.2,
    receivedDate: "2023-09-09T16:30:00.000Z",
  },
  {
    propertyId: "64ff54c8b485b42210278318",
    name: "Soap",
    category: "Health & Beauty",
    quantity: 15,
    costPerItem: 1.3,
    receivedDate: "2023-09-10T09:00:00.000Z",
  },
  {
    propertyId: "64ff54c8b485b42210278318",
    name: "Motorcycle Oil",
    category: "Automotive Supplies",
    quantity: 7,
    costPerItem: 10.0,
    receivedDate: "2023-09-10T11:00:00.000Z",
  },
  {
    propertyId: "64ff54c8b485b42210278318",
    name: "Juice Box",
    category: "Beverages",
    quantity: 35,
    costPerItem: 1.0,
    receivedDate: "2023-09-11T10:00:00.000Z",
  },
  {
    propertyId: "64ff54c8b485b42210278318",
    name: "Beef Jerky",
    category: "Snacks",
    quantity: 19,
    costPerItem: 3.5,
    receivedDate: "2023-09-11T12:00:00.000Z",
  },
  {
    propertyId: "64ff54c8b485b42210278318",
    name: "Travel Pillow",
    category: "Travel and Leisure",
    quantity: 21,
    costPerItem: 12.0,
    receivedDate: "2023-09-11T14:00:00.000Z",
  },
  {
    propertyId: "64ff54c8b485b42210278318",
    name: "Cheese",
    category: "Groceries",
    quantity: 55,
    costPerItem: 2.8,
    receivedDate: "2023-09-11T16:00:00.000Z",
  },
  {
    propertyId: "64ff54c8b485b42210278318",
    name: "Chewing Gum",
    category: "Snacks",
    quantity: 23,
    costPerItem: 0.9,
    receivedDate: "2023-09-11T18:00:00.000Z",
  },
];

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB...");

    // Delete all existing records
    await GasolineProduct.deleteMany({});
    console.log("All old GasolineProduct records deleted.");

    // Insert new records
    await GasolineProduct.insertMany(GasolineProducts);
    console.log("GasolineProduct inserted");
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDB;
