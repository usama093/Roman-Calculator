import React, { useState, useEffect } from "react";
import CalculatorDisplay from "./Components/CalculatorDisplay";
import CalculatorKey from "./Components/CalculatorKey";
import {
  romanChars,
  CalculatorOperations,
  toRoman,
  fromRoman
} from "./Constants/utils";
import "./App.css";

export default function Calculator() {
  const [value, setValue] = useState(null);
  const [displayValue, setDisplayValue] = useState("");
  const [operator, setOperator] = useState(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const clearAll = () => {
    setValue(null);
    setDisplayValue("");
    setOperator(null);
    setWaitingForOperand(false);
  };

  const clearDisplay = () => {
    setDisplayValue("");
  };

  const clearLastChar = () => {
    setDisplayValue(displayValue.substring(0, displayValue.length - 1) || "");
  };

  const inputDigit = digit => {
    if (waitingForOperand) {
      setDisplayValue(String(digit));
      setWaitingForOperand(false);
    } else {
      setDisplayValue(
        displayValue === ""
          ? String(digit)
          : String(displayValue) + String(digit)
      );
    }
  };

  const performOperation = nextOperator => {
    const inputValue = displayValue;

    if (value == null) {
      setValue(inputValue);
    } else if (operator) {
      const currentValue = value || "";

      let newValue = CalculatorOperations[operator](
        fromRoman(currentValue),
        fromRoman(inputValue)
      );
      newValue = toRoman(newValue);
      setValue(newValue);
      setDisplayValue(String(newValue));
    }
    setWaitingForOperand(true);
    setOperator(nextOperator);
  };

  const handleKeyDown = event => {
    let { key } = event;
    event.preventDefault();

    if (key === "Enter") key = "=";
    if (romanChars.test(key)) {
      event.preventDefault();
      inputDigit(key.toUpperCase());
    } else if (key in CalculatorOperations) {
      event.preventDefault();
      performOperation(key);
    } else if (key === "Backspace") {
      event.preventDefault();
      clearLastChar();
    } else if (key === "Clear") {
      event.preventDefault();
      if (displayValue !== "") {
        clearDisplay();
      } else {
        clearAll();
      }
    }
  };

  const displayClear = displayValue !== "";

  return (
    <div className="calculator">
      <CalculatorDisplay value={displayValue} />
      <div className="calculator-keypad">
        <div className="input-keys">
          <div className="digit-keys">
            <CalculatorKey
              className="key-equals"
              onPress={() => performOperation("=")}
            >
              =
            </CalculatorKey>
            <CalculatorKey
              className="key-clear key-0"
              onPress={() => (displayClear ? clearDisplay() : clearAll())}
            >
              CLEAR
            </CalculatorKey>
            <CalculatorKey className="key-M" onPress={() => inputDigit("M")}>
              M
            </CalculatorKey>
            <CalculatorKey className="key-I" onPress={() => inputDigit("I")}>
              I
            </CalculatorKey>
            <CalculatorKey className="key-V" onPress={() => inputDigit("V")}>
              V
            </CalculatorKey>
            <CalculatorKey className="key-X" onPress={() => inputDigit("X")}>
              X
            </CalculatorKey>
            <CalculatorKey className="key-L" onPress={() => inputDigit("L")}>
              L
            </CalculatorKey>
            <CalculatorKey className="key-C" onPress={() => inputDigit("C")}>
              C
            </CalculatorKey>
            <CalculatorKey className="key-D" onPress={() => inputDigit("D")}>
              D
            </CalculatorKey>
          </div>
        </div>
        <div className="operator-keys">
          <CalculatorKey
            className="key-multiply"
            onPress={() => performOperation("*")}
          >
            ×
          </CalculatorKey>
          <CalculatorKey
            className="key-subtract"
            onPress={() => performOperation("-")}
          >
            −
          </CalculatorKey>
          <CalculatorKey
            className="key-add"
            onPress={() => performOperation("+")}
          >
            +
          </CalculatorKey>
        </div>
      </div>
    </div>
  );
}
