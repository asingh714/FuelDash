require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

const connectDB = require("./db/connect");
const authRouter = require("./routes/authRoutes");
const propertyRouter = require("./routes/propertyRoutes");

const app = express();

app.use(morgan("tiny"));
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));

app.get("/", (req, res) => {
  console.log(req.signedCookies.token);
  res.send("<h1>HELLO</h1>");
});

app.use("/api/auth", authRouter);
app.use("/api/properties", propertyRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  connectDB();
  console.log(`Server is running on port ${port}`);
});
