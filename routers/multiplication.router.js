const express = require("express");
const getProduct = require("../controllers/multiplication.controller");

const multiplicationRouter = express.Router();

multiplicationRouter.route("/").get(getProduct);

module.exports = multiplicationRouter;
