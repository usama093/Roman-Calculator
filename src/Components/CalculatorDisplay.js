import React from "react";
import AutoScalingText from "./AutoScalingText";

export default function CalculatorDisplay(Props) {
  const { value, ...props } = Props;
  return (
    <div {...props} className="calculator-display">
      <AutoScalingText>{value}</AutoScalingText>
    </div>
  );
}
