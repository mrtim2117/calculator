const { multiplyTwoNumbersAsynch } = require("../utils/arithmetic");
const { parseOperandsAsynch } = require("../utils/validator");

const getProduct = (req, res, next) => {
  const { multiplicand, multiplier } = req.query;

  return parseOperandsAsynch(multiplicand, multiplier)
    .then(([Op1, Op2]) => {
      return multiplyTwoNumbersAsynch(Op1, Op2);
    })
    .then((product) => {
      return res.status(200).send({ product });
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = getProduct;
