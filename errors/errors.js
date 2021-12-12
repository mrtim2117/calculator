const handleInvalidPath = (req, res, next) => {
  handleCustomErrors({ status: 404, msg: "Path not found!" }, req, res, next);
};

const handleCustomErrors = (err, req, res, next) => {
  if (err.status && err.msg) {
    res.status(err.status).send({ msg: err.msg });
  } else {
    next(err);
  }
};

const handle500Errors = (err, req, res, next) => {
  res.status(500).send({ msg: "Internal server error!" });
};

module.exports = {
  handleInvalidPath,
  handleCustomErrors,
  handle500Errors,
};
