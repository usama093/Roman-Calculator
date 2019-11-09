import React from "react";

export default function CalculatorKey(Props) {
  const { onPress, className, ...props } = Props;

  return (
    <button
      onClick={onPress}
      className={`calculator-key ${className}`}
      {...props}
    />
  );
}
