import React from "react";
import ReactDOM from "react-dom";
import classes from "./Toast.module.css";



type toastProps = {
  onClose: () => void;
  children: string;
  type: string;
};

const ModalOverlay: React.FC<toastProps> = ({ children, onClose, type }) => {
    
    let textColor;
    if(type === 'success'){
        textColor = classes.success;
    }
    else{
        textColor = classes.fail;
    }
  return (
    <>
      <div className={classes.modal}>
        <span className={textColor}>{children}</span>
        <button onClick={onClose}>X</button>
      </div>
    </>
  );
};

const portalElement = document.getElementById("overlays")!;

const Toast: React.FC<toastProps> = ({ children, onClose, type }) => {
  return (
    <>
      {ReactDOM.createPortal(
        <ModalOverlay type={type} onClose={onClose}>{children}</ModalOverlay>,
        portalElement
      )}
    </>
  );
};

export default Toast;
