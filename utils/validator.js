const parseOperandsAsynch = (op1, op2) => {
  const parsePromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (typeof op1 !== "string" || typeof op2 !== "string") {
        reject({ status: 400, msg: "unrecognised input" });
      } else if (isDecimal(op1) || isDecimal(op2)) {
        reject({ status: 400, msg: "input must be an integer" });
      } else if (hasCommas(op1) || hasCommas(op2)) {
        reject({ status: 400, msg: "input must be an integer" });
      } else {
        const arg1 = parseInt(op1);
        const arg2 = parseInt(op2);

        console.log("Validator: ", arg1, arg2);
        if (!Number.isInteger(arg1) || !Number.isInteger(arg2)) {
          reject({ status: 400, msg: "invalid input" });
        } else {
          resolve([arg1, arg2]);
        }
      }
    }, 0);
  });

  return parsePromise;
};

const isDecimal = (op) => {
  return op.includes(".");
};

const hasCommas = (op) => {
  return op.includes(",");
};

module.exports = parseOperandsAsynch;
