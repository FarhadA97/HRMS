import React, { useEffect } from "react";
import classes from "./Toast.module.css";

export interface IToastProps {
  id: number;
  title: string;
  description: string;
  backgroundColor: string;
  autoClose?: boolean | number;
}

interface Props extends IToastProps {
  position: string;
  remove: (id: number) => void;
}

const ToastItem: React.FC<Props> = (props) => {
  props = {...props}
  let defaultTimer = 3000;
  if (props.autoClose === true) {
    props.autoClose = defaultTimer;
  }

  useEffect(() => {
    let interval: ReturnType< typeof setTimeout>;
    if (props.autoClose && typeof props.autoClose === "number") {
      interval = setInterval(() => {
        props.remove(props.id);
      }, props.autoClose);
    }

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div
      className={`${classes.notification} ${classes.toast} ${
        classes[props.position]
      }`}
      style={{ backgroundColor: props.backgroundColor }}
    >
      <button onClick={() => props.remove(props.id)}>X</button>
      <div>
        <p className={classes.title}>
          {props.description ? props.title : "Error 400"}
        </p>
        <p className={classes.description}>
          {props.description ? props.description : `Something Went Wrong`}
        </p>
      </div>
    </div>
  );
};

export default ToastItem;