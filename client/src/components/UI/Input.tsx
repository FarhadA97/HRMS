import React from "react";
import classes from "./Input.module.css";

declare interface InputProps {
  id: string;
  type: string;
  value: string;
  labelText: string;
  hasError: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: () => void;
}

const Input: React.FC<InputProps> = ({
  id,
  type,
  value,
  labelText,
  hasError,
  onChange,
  onBlur,
}) => {
  const InputClasses = hasError
    ? `${classes["form-control"]} ${classes["invalid"]}`
    : `${classes["form-control"]}`;

  return (
    <div className={InputClasses}>
      <label htmlFor={id}>{labelText}</label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
    </div>
  );
};

export default Input;
