import { useState } from "react";
import { useAppSelector } from "../../store/hook";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import Button from "../UI/Button";
import { loginURL, registerURL, User } from "../../config";
import classes from "./AuthForm.module.css";
import TextField from "../UI/TextField";

interface authFormProps {
  hideName: boolean;
  name: string;
  email: string;
  password: string;
}

const AuthForm: React.FC<{
  onLogin: (url: string, data: User) => void;
}> = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const isLoading = useAppSelector((state) => state.auth.loading);

  const initialAuthFormValues: authFormProps = {
    hideName: isLogin,
    name: "",
    email: "",
    password: "",
  };
  
  const authFormValidationSchema = Yup.object({
    name: isLogin
          ? Yup.string()
          : Yup.string().required("*Name is required"),

    email: Yup.string()
      .email("*Email is not valid")
      .required("Email is required"),

    password: Yup.string()
      .min(5, "*Password must be atleast 5 characters long.")
      .required("Password is required"),
  });

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = (values: authFormProps) => {

    const data: User = {
      email: values.email,
      password: values.password,
    };
    
    let url:string = loginURL
    if(!isLogin){
      url = registerURL
      data.name =  values.name
    }

    onLogin(url, data);
  };

  return (
    <Formik
      initialValues={initialAuthFormValues}
      validationSchema={authFormValidationSchema}
      onSubmit={submitHandler}
    >
      {(formik) => (
        <section className={classes.auth}>
          <h1>{isLogin ? "Login" : "Sign Up"}</h1>
          <Form>
            {!isLogin && (
              <TextField
                label="Name"
                type="text"
                name="name"
                placeholder="Name"
              />
            )}
            <TextField
              label="Email"
              type="text"
              name="email"
              placeholder="Email"
            />
            <TextField
              label="Password"
              type="password"
              name="password"
              placeholder="Password"
            />
            <div className={classes.actions}>
              {!isLoading && (
                <Button
                  type="submit"
                  className="submit"
                >
                  {isLogin ? "Login" : "Create Account"}
                </Button>
              )}
              {isLoading && <p>Sending request...</p>}
              <Button
                type="reset"
                className="toggle"
                onClick={(switchAuthModeHandler)}
              >
                {isLogin ? "Create new account" : "Login with existing account"}
              </Button>
            </div>
          </Form>
        </section>
      )}
    </Formik>
  );
};
export default AuthForm;
