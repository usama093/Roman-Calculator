import { CalculatorOperations, toRoman, fromRoman } from "./Constants/utils";

it("Sums 2 Roman numbers", () => {
  expect(
    toRoman(CalculatorOperations["+"](fromRoman("V"), fromRoman("V")))
  ).toEqual("X");
});
it("Subtracts 2 Roman numbers", () => {
  expect(
    toRoman(CalculatorOperations["-"](fromRoman("V"), fromRoman("I")))
  ).toEqual("IV");
});
it("Multiplies 2 Roman numbers", () => {
  expect(
    toRoman(CalculatorOperations["*"](fromRoman("V"), fromRoman("V")))
  ).toEqual("XXV");
});
