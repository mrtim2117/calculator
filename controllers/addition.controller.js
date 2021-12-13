const { sumTwoNumbersAsynch } = require("../utils/arithmetic");
const { parseOperandsAsynch } = require("../utils/validator");

const getSum = (req, res, next) => {
  const { addendOne, addendTwo } = req.query;

  return parseOperandsAsynch(addendOne, addendTwo)
    .then(([Op1, Op2]) => {
      return sumTwoNumbersAsynch(Op1, Op2);
    })
    .then((sum) => {
      return res.status(200).send({ sum });
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = getSum;
