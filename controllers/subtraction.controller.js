const { subtractAFromBAsynch } = require("../utils/arithmetic");
const { parseOperandsAsynch } = require("../utils/validator");

const getDifference = (req, res, next) => {
  const { subtrahend, minuend } = req.query;

  return parseOperandsAsynch(subtrahend, minuend)
    .then(([Op1, Op2]) => {
      return subtractAFromBAsynch(Op1, Op2);
    })
    .then((difference) => {
      return res.status(200).send({ difference });
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = getDifference;
