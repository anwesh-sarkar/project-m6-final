"use strict";

require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/auth-routes");
const itemRoutes = require("./routes/item-routes");
const mongoose = require("mongoose");
const { MONGO_URI } = process.env;

const PORT = 4000;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose.connect(MONGO_URI, options, () => {
  console.log("Successfully connected to db");
});

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
    next();
  })
  .use(morgan("tiny"))
  .use(bodyParser.json())
  .use(cookieParser())
  .use(express.urlencoded({ extended: false }))
  .use("/auth", authRoutes)
  .use("/items", itemRoutes)

  .listen(PORT, () => {
    console.info(`Listening on port ${PORT}`);
  });
