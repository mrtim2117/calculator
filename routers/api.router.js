const express = require("express");
const getApi = require("../controllers/api.controller");

const apiRouter = express.Router();
apiRouter.route("/").get(getApi);
// Now add use get routes ie add etc

module.exports = apiRouter;
