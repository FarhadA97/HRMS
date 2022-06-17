import React from "react";
import AuthForm from "../components/Auth/AuthForm";
import { loginURL, registerURL, User } from "../config";
import { login } from "../store/auth";
import { useAppDispatch } from "../store/hook";
import { useNavigate } from "react-router-dom";

const AuthPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const loginHandler: (isLogin: boolean, data: User) => void = (isLogin,data) => {
    let url: string = loginURL;
    if (!isLogin) url = registerURL;
    dispatch(login({ data, url }))
      .unwrap()
      .then(() => {
        navigate("/");
      })
      .catch((e) => {
        // can dispatch toast either here or in catch block of the above dispatched login method which is async thunk function
        // error toast is dispatched in catch block of asyncthunk login function
      });
  };

  return <AuthForm onLogin={loginHandler} />;
};

export default AuthPage;
