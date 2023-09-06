require("dotenv").config();
const express = require("express");
const morgan = require("morgan");

const connectDB = require("./db/connect");
const authRouter = require("./routes/authRoutes");

const app = express();

app.use(morgan("tiny"));
app.use(express.json());

app.use("/api/auth", authRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  connectDB();
  console.log(`Server is running on port ${port}`);
});
