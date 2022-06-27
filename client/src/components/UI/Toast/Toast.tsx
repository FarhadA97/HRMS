import React, { useCallback } from "react";
import { toastActions } from "../../../store/slices/toast/ToastSlice";
import { useDispatch } from "react-redux";
import classes from "./Toast.module.css";
import { useAppSelector } from "../../../store/hook";
import ToastItem from "./ToastItem";


type toastProps = {
  position: string;
};

const Toast: React.FC<toastProps> = ({ position }) => {
  const toastList = useAppSelector((state) => state.toast.toastProp);
  const dispatch = useDispatch();
  const deleteToast = useCallback(
    (id: number) => {
      dispatch(toastActions.removeToast(id));
    },
    [dispatch]
  );
  


  return (
    <div className={`${classes.container} ${classes[position]}`}>
      {toastList.map((toast) => (
        <ToastItem key={toast.id} {...toast} position={position} remove={deleteToast} />
      ))}
    </div>
  );
};

export default Toast;
