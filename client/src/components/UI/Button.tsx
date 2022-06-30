import React from "react";
import classes from "./Button.module.css";

declare interface ButtonProps {
  children?: string | string[];
  type?: "submit" | "reset" | "button";
  className: string;
  disabled?: boolean;
  onClick?: (e:React.MouseEvent<HTMLButtonElement>,id?:string,) => void;
}

const Button: React.FC<ButtonProps> = ({
  children,
  type,
  className,
  disabled,
  onClick,
}) => {
  const btnClass = `${classes[className]}`;
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
