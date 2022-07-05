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
    dispatch(login({ data, url, navigate }))
  };

  return <AuthForm onLogin={loginHandler} />;
};

export default AuthPage;
