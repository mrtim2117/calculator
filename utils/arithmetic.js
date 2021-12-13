const multiplyTwoNumbersAsynch = (multiplicand, multiplier) => {
  const multiPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(multiplyTwoNumbers(multiplicand, multiplier));
    }, 0);
  });

  return multiPromise;
};

const multiplyTwoNumbers = (multiplicand, multiplier) => {
  return multiplicand * multiplier;
};

const sumTwoNumbersAsynch = (addendOne, addendTwo) => {
  const sumPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(sumTwoNumbers(addendOne, addendTwo));
    }, 0);
  });

  return sumPromise;
};

const sumTwoNumbers = (addendOne, addendTwo) => {
  return addendOne + addendTwo;
};

const subtractAFromBAsynch = (subtrahend, minuend) => {
  const subtractPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(subtractAFromB(subtrahend, minuend));
    }, 0);
  });

  return subtractPromise;
};

const subtractAFromB = (subtrahend, minuend) => {
  return minuend - subtrahend;
};

const divideDividendByDivisorAsynch = (dividend, divisor) => {
  const diviPromise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (divisor === 0) {
        reject({ status: 400, msg: "attempt to divide by zero" });
      } else {
        resolve(divideDividendByDivisor(dividend, divisor));
      }
    }, 0);
  });

  return diviPromise;
};

const divideDividendByDivisor = (dividend, divisor) => {
  // Remember that we're asked to perform integer arithmetic here!
  return Math.trunc(dividend / divisor);
};

module.exports = {
  sumTwoNumbersAsynch,
  subtractAFromBAsynch,
  multiplyTwoNumbersAsynch,
  divideDividendByDivisorAsynch,
};
