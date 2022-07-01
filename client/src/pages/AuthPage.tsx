import React from "react";
import AuthForm from "../components/Auth/AuthForm";
import { User } from "../config";
import { login } from "../store/slices/auth/AuthActions";
import { useAppDispatch } from "../store/hook";
import { useNavigate } from "react-router-dom";

const AuthPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  
  const loginHandler: (url:string, data: User) => void = (url,data) => {
    dispatch(login({ data, url, navigate }))
  };

  return <AuthForm onLogin={loginHandler} />;
};

export default AuthPage;
