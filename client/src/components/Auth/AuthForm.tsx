import { useState } from "react";
import { useAppSelector } from "../../store/hook";
import useInput, { IUserInput } from "../../hooks/use-input";
import Input from "../UI/Input";
import Button from "../UI/Button";
import { User } from "../../config";
import classes from "./AuthForm.module.css";

const AuthForm:React.FC<{onLogin: (isLogin:boolean,data:User) => void }> = ({onLogin}) => {

  const isLoading = useAppSelector(state => state.auth.loading);
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

    const data: User = { name, email, password };
    if (!formIsValid) {
      return;
    }
  
    onLogin(isLogin,data);

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
              <Button className="login" disabled={!formIsValid}>
                {" "}
                {isLogin ? "Login" : "Create Account"}{" "}
              </Button>
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
