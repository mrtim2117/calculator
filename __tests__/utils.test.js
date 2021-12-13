const { isDecimal, hasCommas } = require("../utils/validator");

describe("isDecimal()", () => {
  test("returns false for empty string", () => {
    expect(isDecimal("")).toBe(false);
  });
  test("returns true for a string containing a single dot", () => {
    expect(isDecimal("0.519")).toBe(true);
  });
  test("returns true for a string containing multiple dots", () => {
    expect(isDecimal("0.51.9")).toBe(true);
  });
  test("returns false for a string containing no dots", () => {
    expect(isDecimal("50")).toBe(false);
  });
});

describe("hasCommas", () => {
  test("returns false for empty string", () => {
    expect(hasCommas("")).toBe(false);
  });
  test("returns true for string containing single comma", () => {
    expect(hasCommas("100,000")).toBe(true);
  });
  test("returns true for string containing multiple commas", () => {
    expect(hasCommas("100,000,000")).toBe(true);
  });
  test("returns false for string containing zero commas", () => {
    expect(hasCommas("100000000")).toBe(false);
  });
});
