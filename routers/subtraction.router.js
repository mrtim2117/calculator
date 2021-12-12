const express = require("express");
const getDifference = require("../controllers/subtraction.controller");

const subtractionRouter = express.Router();

subtractionRouter.route("/").get(getDifference);

module.exports = subtractionRouter;
