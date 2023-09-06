require("dotenv").config();
const express = require("express");
const morgan = require("morgan");

const connectDB = require("./db/connect");

const app = express();

app.use(morgan("tiny"));
app.use(express.json());

const port = process.env.PORT || 3000;

app.listen(port, () => {
  connectDB();
  console.log(`Server is running on port ${port}`);
});
