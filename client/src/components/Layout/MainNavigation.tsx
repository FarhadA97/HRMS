//import { useEffect,useState } from 'react';
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../store/hook";
import { Link } from "react-router-dom";
import classes from "./MainNavigation.module.css";
import { authActions } from "../../store/slices/auth";

const MainNavigation = () => {
  const dispatch = useAppDispatch();
  const isLoggedIn = localStorage.getItem("user") ? true : false;
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(authActions.logout());
    navigate("/login");
  };

  return (
    <header className={classes.header}>
      <Link to="/">
        <div className={classes.logo}>React App</div>
      </Link>
      <nav>
        <ul>
          {!isLoggedIn && (
            <li>
              <Link to="/login">Login</Link>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <Link to="/candidates">View Candidates</Link>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <button onClick={logoutHandler}>Logout</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
