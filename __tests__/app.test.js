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
        expect(Object.keys(res.body.endpoints).length).toBe(1);
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
        console.log(res.body.msg);
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
      .then((res) => {
        console.log("Test: ", res.body.msg);
      });
  });
  test("unable to work with multiple commas", () => {
    return request(app)
      .get("/api/add?addendOne=7,000,000&addendTwo=16")
      .expect(400)
      .then((res) => {
        console.log("Test: ", res.body.msg);
      });
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
  // larger numbers
  // missing operands
  // ignores more than 2 operands
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

  // Same as for subtract tests
});
describe("GET divide", () => {
  test("divides dividend by divisor", () => {
    return request(app)
      .get("/api/divide?dividend=8&divisor=2")
      .expect(200)
      .then((res) => {
        expect(res.body.quotient).toBe(4);
        console.log("Test: ", res.body);
      });
  });
  test("divides dividend by divisor, returning decimal", () => {
    return request(app)
      .get("/api/divide?dividend=9&divisor=2")
      .expect(200)
      .then((res) => {
        // expect(res.body.quotient).toBe(4);
        console.log("Test: ", res.body);
      });
  });
});
// console.log("Test: ", res.body);
