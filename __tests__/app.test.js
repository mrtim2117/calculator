const request = require("supertest");
const app = require("../app");

describe("Non-existent route", () => {
  test("/api/gobbleguke", () => {
    return request(app)
      .get("/api/gobbleguke")
      .expect(404)
      .then((res) => {
        expect(res.body.msg).toBe("Path not found!");
      });
  });
  test("/", () => {
    return request(app)
      .get("/")
      .expect(404)
      .then((res) => {
        expect(res.body.msg).toBe("Path not found!");
      });
  });
});

describe("GET /api", () => {
  test("Returns list of endpoints supported", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then((res) => {
        expect(Object.keys(res.body.endpoints).length).toBe(5);
      });
  });
});

describe("GET add", () => {
  test("returns the sum of two integer values", () => {
    return request(app)
      .get("/api/add?addendOne=2&addendTwo=3")
      .expect(200)
      .then((res) => {
        expect(res.body.sum).toBe(5);
      });
  });
  test("rejects addendOne as a decimal", () => {
    return request(app)
      .get("/api/add?addendOne=2.5&addendTwo=3")
      .expect(400)
      .then((res) => {
        expect(res.body.msg).toBe("input must be an integer");
      });
  });
  test("rejects addendTwo as a decimal", () => {
    return request(app)
      .get("/api/add?addendOne=2&addendTwo=3.2")
      .expect(400)
      .then((res) => {
        expect(res.body.msg).toBe("input must be an integer");
      });
  });
  test("rejects both addends as decimal", () => {
    return request(app)
      .get("/api/add?addendOne=2.5&addendTwo=3.7")
      .expect(400)
      .then((res) => {
        expect(res.body.msg).toBe("input must be an integer");
      });
  });
  test("rejects non-numeric data type for addendOne", () => {
    return request(app)
      .get("/api/add?addendOne=bool&addendTwo=5")
      .expect(400)
      .then((res) => {
        expect(res.body.msg).toBe("invalid input");
      });
  });
  test("rejects non-numeric data type for addendTwo", () => {
    return request(app)
      .get("/api/add?addendOne=5&addendTwo=true")
      .expect(400)
      .then((res) => {
        expect(res.body.msg).toBe("invalid input");
      });
  });
  test("rejects non-numeric data type for both addends", () => {
    return request(app)
      .get("/api/add?addendOne={number: 2}&addendTwo=true")
      .expect(400)
      .then((res) => {
        expect(res.body.msg).toBe("invalid input");
      });
  });
  test("Any operands after the first two are ignored", () => {
    return request(app)
      .get("/api/add?addendOne=7&addendTwo=14&addendThree=5")
      .expect(200)
      .then((res) => {
        expect(res.body.sum).toBe(21);
      });
  });
  test("fails with one missing operand", () => {
    return request(app)
      .get("/api/add?addendOne=7")
      .expect(400)
      .then((res) => {
        expect(res.body.msg).toBe("unrecognised input");
      });
  });
  test("fails with both operands missing", () => {
    return request(app)
      .get("/api/add")
      .expect(400)
      .then((res) => {
        expect(res.body.msg).toBe("unrecognised input");
      });
  });
  test("unable to work with commas", () => {
    return request(app)
      .get("/api/add?addendOne=7&addendTwo=14,000")
      .expect(400)
      .then((res) => {});
  });
  test("unable to work with multiple commas", () => {
    return request(app)
      .get("/api/add?addendOne=7,000,000&addendTwo=16")
      .expect(400)
      .then((res) => {});
  });
  test("returns the sum of two larger integers", () => {
    return request(app)
      .get("/api/add?addendOne=2000000&addendTwo=80000000")
      .expect(200)
      .then((res) => {
        expect(res.body.sum).toBe(82000000);
      });
  });
});
describe("GET subtract", () => {
  test("subtracts subtrahend from minuend", () => {
    return request(app)
      .get("/api/subtract?subtrahend=5&minuend=12")
      .expect(200)
      .then((res) => {
        expect(res.body.difference).toBe(7);
      });
  });
  test("subtracts subtrahend from minuend for a negative result", () => {
    return request(app)
      .get("/api/subtract?subtrahend=12&minuend=7")
      .expect(200)
      .then((res) => {
        expect(res.body.difference).toBe(-5);
      });
  });
  test("subtracts negative subtrahend from negative minuend", () => {
    return request(app)
      .get("/api/subtract?subtrahend=-14&minuend=-5")
      .expect(200)
      .then((res) => {
        expect(res.body.difference).toBe(9);
      });
  });
  test("Nan as an operand fails", () => {
    return request(app)
      .get("/api/subtract?subtrahend=NaN&minuend=10")
      .expect(400)
      .then((res) => {
        expect(res.body.msg).toBe("invalid input");
      });
  });
  test("happy with large subtrahend", () => {
    return request(app)
      .get("/api/subtract?subtrahend=10000000&minuend=9")
      .expect(200)
      .then((res) => {
        expect(res.body.difference).toBe(-9999991);
      });
  });
  test("any operands after the first two are ignored", () => {
    return request(app)
      .get("/api/subtract?subtrahend=5&minuend=9&something=5")
      .expect(200)
      .then((res) => {
        expect(res.body.difference).toBe(4);
      });
  });
  test("fails with one missing operand", () => {
    return request(app)
      .get("/api/subtract?subtrahend=10000000")
      .expect(400)
      .then((res) => {
        expect(res.body.msg).toBe("unrecognised input");
      });
  });
});
describe("GET multiply", () => {
  test("multiplies two numbers to give the product", () => {
    return request(app)
      .get("/api/multiply?multiplicand=10&multiplier=4")
      .expect(200)
      .then((res) => {
        expect(res.body.product).toBe(40);
      });
  });
  test("multiplies two larger numbers to give the product", () => {
    return request(app)
      .get("/api/multiply?multiplicand=100000&multiplier=1000000")
      .expect(200)
      .then((res) => {
        expect(res.body.product).toBe(100000000000);
      });
  });
  test("fails with one missing operand", () => {
    return request(app)
      .get("/api/multiply?multiplicand=100")
      .expect(400)
      .then((res) => {
        expect(res.body.msg).toBe("unrecognised input");
      });
  });
  test("ignores additional operands beyond the first two", () => {
    return request(app)
      .get("/api/multiply?multiplicand=5&multiplier=10&something=30")
      .expect(200)
      .then((res) => {
        expect(res.body.product).toBe(50);
      });
  });
});
describe("GET divide", () => {
  test("divides dividend by divisor", () => {
    return request(app)
      .get("/api/divide?dividend=8&divisor=2")
      .expect(200)
      .then((res) => {
        expect(res.body.quotient).toBe(4);
      });
  });
  test("divides dividend by divisor, returning integer element of quotient alone", () => {
    return request(app)
      .get("/api/divide?dividend=9&divisor=2")
      .expect(200)
      .then((res) => {
        expect(res.body.quotient).toBe(4);
      });
  });
  test("gives zero when quotient less than but close to 1", () => {
    return request(app)
      .get("/api/divide?dividend=9&divisor=10")
      .expect(200)
      .then((res) => {
        expect(res.body.quotient).toBe(0);
      });
  });
  test("gives zero when quotient less than but close to 0.5", () => {
    return request(app)
      .get("/api/divide?dividend=49&divisor=100")
      .expect(200)
      .then((res) => {
        expect(res.body.quotient).toBe(0);
      });
  });
  test("gives zero when quotient close to 0", () => {
    return request(app)
      .get("/api/divide?dividend=1&divisor=100")
      .expect(200)
      .then((res) => {
        expect(res.body.quotient).toBe(0);
      });
  });
  test("0 divided by a number is 0", () => {
    return request(app)
      .get("/api/divide?dividend=0&divisor=3")
      .expect(200)
      .then((res) => {
        expect(res.body.quotient).toBe(0);
      });
  });
  test("negative divident gives negative quotient", () => {
    return request(app)
      .get("/api/divide?dividend=-10&divisor=5")
      .expect(200)
      .then((res) => {
        expect(res.body.quotient).toBe(-2);
      });
  });
  test("negative divisor gives negative quotient", () => {
    return request(app)
      .get("/api/divide?dividend=10&divisor=-4")
      .expect(200)
      .then((res) => {
        expect(res.body.quotient).toBe(-2);
      });
  });
  test("negative divisor and negative divident gives positive quotient", () => {
    return request(app)
      .get("/api/divide?dividend=-30&divisor=-3")
      .expect(200)
      .then((res) => {
        expect(res.body.quotient).toBe(10);
      });
  });
  test("handles larger inputs", () => {
    return request(app)
      .get("/api/divide?dividend=50000000&divisor=10000000")
      .expect(200)
      .then((res) => {
        expect(res.body.quotient).toBe(5);
      });
  });
  test("handles larger answers", () => {
    return request(app)
      .get("/api/divide?dividend=5000000000&divisor=2")
      .expect(200)
      .then((res) => {
        expect(res.body.quotient).toBe(2500000000);
      });
  });
  test("handles divide by zero gracefully", () => {
    return request(app)
      .get("/api/divide?dividend=42&divisor=0")
      .expect(400)
      .then((res) => {
        expect(res.body.msg).toBe("attempt to divide by zero");
      });
  });
  test("handles missing operands", () => {
    return request(app)
      .get("/api/divide?divisor=2")
      .expect(400)
      .then((res) => {
        expect(res.body.msg).toBe("unrecognised input");
      });
  });
  test("additional operands beyond the first two are ignored", () => {
    return request(app)
      .get("/api/divide?dividend=10&divisor=2&something=37")
      .expect(200)
      .then((res) => {
        expect(res.body.quotient).toBe(5);
      });
  });
});
