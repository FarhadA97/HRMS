import React from "react";
import classes from './Button.module.css'

declare interface ButtonProps {
  children?: string| string[];
  type?: "submit" | "reset" | "button";
  classText: string;
  disabled?: boolean;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({
  children,
  type,
  classText,
  disabled,
  onClick,
}) => {
    const btnClass = `${classes[classText]}`
  return (
    <button
      type={type}
      className={btnClass}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
