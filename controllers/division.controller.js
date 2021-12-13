const { divideDividendByDivisorAsynch } = require("../utils/arithmetic");
const { parseOperandsAsynch } = require("../utils/validator");

const getQuotient = (req, res, next) => {
  const { dividend, divisor } = req.query;

  return parseOperandsAsynch(dividend, divisor)
    .then(([Op1, Op2]) => {
      return divideDividendByDivisorAsynch(Op1, Op2);
    })
    .then((quotient) => {
      return res.status(200).send({ quotient });
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = getQuotient;
