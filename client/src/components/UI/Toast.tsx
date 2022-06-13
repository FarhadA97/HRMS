import React,{useCallback, useEffect} from "react";
import { toastActions } from "../../store/toast";
import { useDispatch } from "react-redux";
import styles from "./Toast.module.css";

export interface IToastProps {
    id: number;
    title: string;
    description: string;
    backgroundColor: string;
}

type toastProps = {
    toastList: IToastProps[];
    position: string;
}

const Toast : React.FC<toastProps> = ({ toastList, position }) => {

  const dispatch = useDispatch();
  const deleteToast = useCallback((id:number) => {
      
      dispatch(toastActions.removeToast(id));
    },
    [dispatch]
  );

  useEffect(() => {
    const interval = setInterval(() => {
      if (toastList.length) {
        deleteToast(toastList[0].id);
      }
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, [toastList, deleteToast]);
  return (
    <div className={`${styles.container} ${styles[position]}`}>
      {toastList.map((toast) => (
        <div
          key={toast.id}
          className={`${styles.notification} ${styles.toast} ${styles[position]}`}
          style={{ backgroundColor: toast.backgroundColor }}
        >
          <button onClick={() => deleteToast(toast.id)}>X</button>
          <div>
            <p className={styles.title}>{toast.description ? toast.title : 'Error 400'}</p>
            <p className={styles.description}>{toast.description ? toast.description : `Something Went Wrong`}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Toast;
