import React, { useState } from "react";

export interface IUserInput {
  value: string;
  isValid: boolean;
  hasError: boolean;
  valueChangeHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
  valueBlurHandler: () => void;
  reset: () => void;
}

const useInput = (validateValue : (value : string) =>  boolean) => {
  const [enteredValue, setEnteredValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);
  const valueIsValid = validateValue(enteredValue);
  const hasError = !valueIsValid && isTouched;

  const valueChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEnteredValue(e.target.value);
  };

  const valueBlurHandler = () => {
    setIsTouched(true);
  };

  const reset = () => {
    setEnteredValue("");
    setIsTouched(false);
  };

  return {
    value: enteredValue,
    isValid: valueIsValid,
    hasError,
    valueChangeHandler,
    valueBlurHandler,
    reset,
  };
};

export default useInput;
