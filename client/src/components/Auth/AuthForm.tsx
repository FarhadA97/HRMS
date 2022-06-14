import {useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../store/hook";
import useInput, { IUserInput } from "../../hooks/use-input";
import { register,login } from "../../service/auth-service";
import { authActions } from "../../store/auth";
import { toastActions } from "../../store/toast";
import { Title } from "../../store/toast";
import Input from "../UI/Input";
import Button from "../UI/Button";
import { loginURL, registerURL } from "../../config";
import classes from "./AuthForm.module.css";

const AuthForm = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
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
    setIsLoading(true);

    if (!formIsValid) {
      return;
    }

    let response;
    let url: string;
    if (isLogin) {
      url = loginURL;
      response = await login(url, {email,password});
    }else {
      url = registerURL
      response = await register(url, {name,email,password});   
    }
    setIsLoading(false);
    if(response.status !== 200) {
      dispatch(toastActions.showToast({type: Title.ERROR, message: response.data.message}))
      return;
    }

    dispatch(authActions.login(response.data));
    dispatch(toastActions.showToast({type: Title.SUCCESS, message: 'User Logged in'}))
    navigate('/');
    

    nameResetHandler();
    emailResetHandler();
    passwordResetHandler();
  };

  

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
              <Button className="login" disabled={!formIsValid}> {isLogin ? "Login" : "Create Account"} </Button>
            )}
            {isLoading && <p>Sending request...</p>}
            <Button
              type="button"
              className="toggle"
              onClick={switchAuthModeHandler}
            >
              {isLogin ? "Create new account" : "Login with existing account"}
            </Button>
          </div>
        </form>
      </section>
    </>
  );
};
export default AuthForm;
