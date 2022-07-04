import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import HomePage from "./pages/HomePage";
import AuthPage from "./pages/AuthPage";
import Toast from "./components/UI/Toast/Toast";
import {useAppSelector } from "./store/hook";
import AddCandidatePage from "./pages/AddCandidatePage";
import CandidatesPage from "./pages/CandidatesPage";

const App = () => {
  const isLoggedIn:boolean = useAppSelector((state) => state.auth.isLoggedIn);
 

  return (
    <>
      <Toast position="top-right" />
      <Layout>
        <Routes>
          <Route path="/" element={isLoggedIn ? <HomePage /> : <Navigate to='/login' replace/>} />
          <Route path="/candidates" element={isLoggedIn ? <CandidatesPage/> : <Navigate to='/login' replace />} />
          <Route path="/candidates/add" element={isLoggedIn ? <AddCandidatePage /> : <Navigate to='/login' replace />} />
          <Route path="/candidates/edit/:id" element={isLoggedIn ? <AddCandidatePage /> : <Navigate to='/login' replace/>} />
          <Route path="/login" element={!isLoggedIn ? <AuthPage /> : <Navigate to='/' replace/>} />
          <Route path="*" element={isLoggedIn ? <Navigate to='/'/> : <Navigate to='/login' replace/>} />
        </Routes>
      </Layout>
    </>
  );
};

export default App;
