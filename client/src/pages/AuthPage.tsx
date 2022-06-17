import React from "react";
import AuthForm from "../components/Auth/AuthForm";
import { loginURL, registerURL, User } from "../config";
import { login } from "../store/auth";
import { useAppDispatch } from "../store/hook";
import { useNavigate } from "react-router-dom";

const AuthPage = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const loginHandler: (isLogin: boolean, data: User) => void = (
    isLogin,
    data
  ) => {
    if (isLogin) {
      dispatch(login({ data, url: loginURL }))
        .unwrap()
        .then(() => {
          navigate("/");
        })
        .catch((e) => {
          //empty for now
        });
    } else {
      dispatch(login({ data, url: registerURL }))
        .unwrap()
        .then(() => {
          navigate("/");
        })
        .catch((e) => {
          //empty for now
        });
    }
  };
  return <AuthForm onLogin={loginHandler} />;
};

export default AuthPage;
