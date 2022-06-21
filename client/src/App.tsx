import { useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import Toast from "./components/UI/Toast";
import { useAppDispatch, useAppSelector } from "./store/hook";
import AddCandidatePage from "./pages/AddCandidatePage";
import { getCandidates } from "./store/slices/candidate";

const App = () => {
  const list = useAppSelector((state) => state.toast.toastProp);
  const dispatch = useAppDispatch();
 
  const isLoggedIn:boolean = localStorage.getItem("user") ? true : false;
  useEffect(() => {
    dispatch(getCandidates());
  }, [dispatch]);

  return (
    <>
      <Toast toastList={list} position="top-right" />
      <Layout>
        <Routes>
          <Route path="/" element={isLoggedIn ? <HomePage /> : <Navigate to='/login' replace/>} />
          <Route path="/add" element={isLoggedIn ? <AddCandidatePage /> : <Navigate to='/login' replace />} />
          {!isLoggedIn && <Route path="/login" element={<AuthPage />} />}
          <Route path="*" element={isLoggedIn ? <Navigate to='/'/> : <Navigate to='/login' replace/>} />
        </Routes>
      </Layout>
    </>
  );
};

export default App;
