import React from "react";
import { useField, ErrorMessage } from "formik";
import classes from "./Input.module.css";

declare interface InputProps {
  name: string;
  type: string;
  placeholder: string;
  label: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
}

const Input: React.FC<InputProps> = (props) => {
  const [field,meta] = useField({name: props.name});

  const InputClasses = meta.touched && meta.error
    ? `${classes["form-control"]} ${classes["invalid"]}`
    : `${classes["form-control"]}`;

  return (
    <div className={InputClasses}>
      <label htmlFor={props.name}>{props.label}</label>
      <input
        {...field}
        type={props.type}
        name={props.name}
        placeholder={props.placeholder}
        autoComplete='off'
      />
      <ErrorMessage component='div' name={field.name} className='formik-error'/>
    </div>
  );
};

export default Input;
