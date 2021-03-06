const express = require("express");
const apiRouter = require("./routers/api.router");
const {
  handleInvalidPath,
  handleCustomErrors,
  handle500Errors,
} = require("./errors/errors");

const app = express();
app.use(express.json());

app.use("/api", apiRouter);
app.all("/*", handleInvalidPath);

app.use(handleCustomErrors);
app.use(handle500Errors);

module.exports = app;
