const express = require("express");
const smallcaseController = require("./controllers/smallcase.controller");
const { register, login } = require("./controllers/auth.controller");
const authenticate = require("./middlewares/authenticate");
const watchlistController = require("./controllers/watchlist.controller");
const segmentController = require("./controllers/segment.controller");
const stockController = require("./controllers/stock.controller");
const path = require("path");
const viewController = require("./controllers/view.controller");
const cookieParser = require("cookie-parser");

const cors = require("cors");
const {
  createOrder,
  verifyPayment,
} = require("./controllers/payment.controller");

const app = express();

app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());
app.use(cors());
app.options("*", cors());
app.use(express.json());
app.use("/", viewController);
app.use("/api/smallcases", smallcaseController);
app.use("/api/watchlist", watchlistController);
app.post("/api/register", register);
app.post("/api/login", login);
app.post("/payment/order", authenticate, createOrder);
app.post("/payment/verify", authenticate, verifyPayment);
app.use("/segments", segmentController);
app.use("/stocks", stockController);

module.exports = app;
