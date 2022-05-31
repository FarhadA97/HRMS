import { useState, useRef, } from 'react';
import { useAppDispatch } from '../../store/hook';
import { useNavigate } from 'react-router-dom';
import Axios,{AxiosError} from 'axios';
import { authActions } from '../../store/auth';
import Toast from '../UI/Toast';
import classes from './AuthForm.module.css';


const AuthForm = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const nameInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const passwordInputRef = useRef<HTMLInputElement>(null);


  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [message, setMessage] = useState('');
  const [type, setType] = useState('');
  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const toastHandler = () =>{
     setShowToast(false);
  }

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const email = emailInputRef.current?.value;
    const password = passwordInputRef.current?.value;
    const name = nameInputRef.current?.value;
    console.log(email,name,password);
    // Add validation
    

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
            setMessage('Login Successful');
            setShowToast(true);
            setType('success');
            setTimeout(()=>{
              navigate('/');
            },900)
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
        const err = errObj.response?.data;
        const response = err as AxiosError;
        setMessage(response.message);
        setShowToast(true);
        setType('fail');
        setTimeout(()=>{
          setShowToast(false);
        },2000)
        

    }
}

  return (
    <section className={classes.auth}>
        {showToast && <Toast onClose={toastHandler} type={type}>{message}</Toast>}
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