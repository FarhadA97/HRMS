import { useEffect, useState } from "react";
import { useAppDispatch } from "../../store/hook";
import { useNavigate } from "react-router-dom";
import { authActions } from "../../store/auth";
import useInput, { IUserInput } from "../../hooks/use-input";
import Input from "../UI/Input";
import { toastActions } from "../../store/toast";
import { Title } from "../../store/toast";
import { loginURL, registerURL } from "../../config";
import classes from "./AuthForm.module.css";
import useHttp from "../../hooks/use-http";

const AuthForm = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { isLoading, errorMessage, errCount, data, sendRequest: signIn } = useHttp();
  const {
    value: name,
    isValid: nameIsValid,
    hasError: nameHasError,
    valueChangeHandler: nameChangeHandler,
    valueBlurHandler: nameBlurHandler,
    reset: nameResetHandler,
  }: IUserInput = useInput((value: string) => value.trim() !== "");

  const {
    value: email,
    isValid: emailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    valueBlurHandler: emailBlurHandler,
    reset: emailResetHandler,
  }: IUserInput = useInput((value: string) => value.includes("@"));

  const {
    value: password,
    isValid: passwordIsValid,
    hasError: passwordHasError,
    valueChangeHandler: passwordChangeHandler,
    valueBlurHandler: passwordBlurHandler,
    reset: passwordResetHandler,
  }: IUserInput = useInput((value: string) => value.trim() !== "");

  const [isLogin, setIsLogin] = useState(true);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  let formIsValid = false;
  if (isLogin) {
    if (emailIsValid && passwordIsValid) formIsValid = true;
  } else {
    if (nameIsValid && emailIsValid && passwordIsValid) formIsValid = true;
  }

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formIsValid) {
      return;
    }

    let url: string;
    if (isLogin) {
      url = loginURL;
    } else {
      url = registerURL;
    }

    signIn({
      method: "POST",
      url: url,
      data: {
        name,
        email,
        password,
      },
    })

    nameResetHandler();
    emailResetHandler();
    passwordResetHandler();
  };

  useEffect(() => {
    console.log(errorMessage)
    if(errorMessage?.length === 0) {
      if(data.user.name.trim() !== ''){
        dispatch(authActions.login(data));
        dispatch(
            toastActions.showToast({
              type: Title.SUCCESS,
              message: "Login Successful",
            })
          );
      }
      navigate('/');
      
    }
    else{
      dispatch(
            toastActions.showToast({
              type: Title.ERROR,
              message: errorMessage,
            })
          );
    }
  },[errCount,errorMessage,data,dispatch,navigate])

  return (
    <>
      <section className={classes.auth}>
        <h1>{isLogin ? "Login" : "Sign Up"}</h1>
        <form onSubmit={submitHandler}>
          {!isLogin && (
            <Input
              type="text"
              id="name"
              value={name}
              onChange={nameChangeHandler}
              onBlur={nameBlurHandler}
              labelText="Name"
              hasError={nameHasError}
            />
          )}
          <Input
            type="text"
            id="name"
            value={email}
            onChange={emailChangeHandler}
            onBlur={emailBlurHandler}
            labelText="Email"
            hasError={emailHasError}
          />
          <Input
            type="password"
            id="password"
            value={password}
            onChange={passwordChangeHandler}
            onBlur={passwordBlurHandler}
            labelText="Password"
            hasError={passwordHasError}
          />
          <div className={classes.actions}>
            {!isLoading && (
              <button disabled={!formIsValid}>
                {isLogin ? "Login" : "Create Account"}
              </button>
            )}
            {isLoading && <p>Sending request...</p>}
            <button
              type="button"
              className={classes.toggle}
              onClick={switchAuthModeHandler}
            >
              {isLogin ? "Create new account" : "Login with existing account"}
            </button>
          </div>
        </form>
      </section>
    </>
  );
};
export default AuthForm;
