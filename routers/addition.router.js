const express = require("express");
const getSum = require("../controllers/addition.controller");

const additionRouter = express.Router();

additionRouter.route("/").get(getSum);

module.exports = additionRouter;
