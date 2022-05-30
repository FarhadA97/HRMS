import { useState, useRef, } from 'react';
import { useAppDispatch } from '../../store/hook';
import { useNavigate } from 'react-router-dom';
import Axios,{AxiosError} from 'axios';
import { authActions } from '../../store/auth';
import classes from './AuthForm.module.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AuthForm = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const nameInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);


  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const email = emailInputRef.current?.value;
    const password = passwordInputRef.current?.value;
    const name = nameInputRef.current?.value;
    console.log(email,name,password);
    // optional: Add validation

    setIsLoading(true);
    let url;
    if (isLogin) {
      url =
        'http://localhost:9000/user/login';
    } else {
      url =
        'http://localhost:9000/user/register';
    }
    try 
    {
        const response = await Axios({
            method: 'POST',
            url: url,
            data: {
                name,
                email,
                password
            }
        });

        if (response.status === 200)
        {
            // Could also use history.push('/login')
            setIsLoading(false);
            dispatch(authActions.login(response.data))
            navigate('/');
        }
        else
        {   
            setIsLoading(false);
            console.log("unspecified");
        }
    } 
    catch (error) 
    {
        setIsLoading(false);
        const errObj = error as AxiosError
        const err:any = errObj.response;
        const notify = () => toast.error(err.data?.message);
        notify();

    }
}

  return (
    <section className={classes.auth}>
        <ToastContainer position='bottom-center'/>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitHandler}>
        {!isLogin &&
            <div className={classes.control}>
             <label htmlFor='name'>Name</label>
             <input type='text' id='name' required ref={nameInputRef} />
             </div>
         }
        <div className={classes.control}>
          <label htmlFor='email'>Email</label>
          <input type='email' id='email' required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Password</label>
          <input
            type='password'
            id='password'
            required
            ref={passwordInputRef}
          />
        </div>
        <div className={classes.actions}>
          {!isLoading && (
            <button>{isLogin ? 'Login' : 'Create Account'}</button>
          )}
          {isLoading && <p>Sending request...</p>}
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  );
}
export default AuthForm;