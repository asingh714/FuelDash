require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const connectDB = require("./db/connect");
const authRouter = require("./routes/authRoutes");
const propertyRouter = require("./routes/propertyRoutes");
const userRouter = require("./routes/userRoutes");
const gasolineRouter = require("./routes/gasolineRoutes");
const nonGasolineRouter = require("./routes/nonGasolineRoutes");
const dailySalesRouter = require("./routes/dailySalesRoutes");
const financialTotalRouter = require("./routes/financialTotalRoutes");
const contactRouter = require("./routes/contactRoutes");
const notFound = require("./middleware/notFound");

const app = express();

// app.use(cors({ origin: "http://localhost:5173", credentials: true }));

// CORS configuration to enable cross-origin requests from specified origins
app.use(
  cors((req, callback) => {
    const allowedOrigins = ["https://www.fueldash.co", "https://fueldash.co"];
    const origin = req.header("Origin");
    let corsOptions;
    if (allowedOrigins.includes(origin)) {
      corsOptions = { origin: true, credentials: true };
    } else {
      corsOptions = { origin: false };
    }
    callback(null, corsOptions);
  })
);

app.use(morgan("tiny"));
app.use(express.json());
app.use(cookieParser(process.env.JWT_SECRET));

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/properties", propertyRouter);
app.use("/api/gasoline", gasolineRouter);
app.use("/api/nonGas", nonGasolineRouter);
app.use("/api/sales", dailySalesRouter);
app.use("/api/total", financialTotalRouter);
app.use("/api/contact", contactRouter);

app.use(notFound);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  connectDB();
  console.log(`Server is running on port ${port}`);
});
