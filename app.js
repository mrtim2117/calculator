const express = require("express");
const apiRouter = require("./routers/api.router");

const app = express();

app.use(express.json());
app.use("/api", apiRouter);

// then invalid path
// app.all("/*", handleInvalidPath);

module.exports = app;
