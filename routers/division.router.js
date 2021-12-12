const express = require("express");
const getQuotient = require("../controllers/division.controller");

const divisionRouter = express.Router();

divisionRouter.route("/").get(getQuotient);

module.exports = divisionRouter;
