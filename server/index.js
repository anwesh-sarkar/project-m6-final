"use strict";

require("dotenv").config();

const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/auth-routes");
const itemRoutes = require("./routes/item-routes");
const addressRoutes = require("./routes/address-routes");
const userRoutes = require("./routes/user-routes");
const mongoose = require("mongoose");
const { MONGO_URI } = process.env;

const PORT = 5000;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
};

express()
  .use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Methods",
      "OPTIONS, HEAD, GET, PUT, POST, DELETE"
    );
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.header("Access-Control-Allow-Origin", "*");
    next();
  })
  .use(morgan("tiny"))
  .use(express.json())
  .use(cookieParser())
  .use(express.urlencoded({ extended: false }))
  .use(cors())
  .options("*", cors())
  .use("/auth", authRoutes)
  .use("/items", itemRoutes)
  .use("/address", addressRoutes)
  .use("/users", userRoutes)

  .listen(PORT, () => {
    console.info(`Listening on port ${PORT}`);
  });

mongoose.connect(MONGO_URI, options, () => {
  console.log("Successfully connected to db");
});
