import { totalmem } from "os";
import React,{useCallback, useEffect} from "react";
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
    setList: React.Dispatch<React.SetStateAction<any[]>>;
}

const Toast : React.FC<toastProps> = ({ toastList, position, setList }) => {


  const deleteToast = useCallback((id:number) => {
      const toastListItem = toastList.filter((e) => e.id !== id);
      setList(toastListItem);
    },
    [toastList, setList]
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
      {toastList.map((toast, i) => (
        <div
          key={i}
          className={`${styles.notification} ${styles.toast} ${styles[position]}`}
          style={{ backgroundColor: toast.backgroundColor }}
        >
          {toast.description==='success' ? <button onClick={() => deleteToast(toast.id)}>X</button> : null}
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
