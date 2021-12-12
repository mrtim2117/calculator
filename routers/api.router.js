const express = require("express");
const getApi = require("../controllers/api.controller");
const additionRouter = require("./addition.router");
const subtractionRouter = require("./subtraction.router");
const multiplicationRouter = require("./multiplication.router");
const divisionRouter = require("./division.router");

const apiRouter = express.Router();
apiRouter.route("/").get(getApi);
apiRouter.use("/add", additionRouter);
apiRouter.use("/subtract", subtractionRouter);
apiRouter.use("/multiply", multiplicationRouter);
apiRouter.use("/divide", divisionRouter);

module.exports = apiRouter;
