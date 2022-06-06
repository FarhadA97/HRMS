import { useEffect, useState } from 'react';
import {Route, Routes, useLocation} from 'react-router-dom';
import Layout from './components/Layout/Layout';
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import Toast from './components/UI/Toast';
import { useAppSelector } from './store/hook';


const App = () => {

  const list = useAppSelector((state) => state.toast.toastProp);
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('user') ? true : false);

  

  useEffect(()=>{
    setIsLoggedIn(localStorage.getItem('user')?true:false);
  },[location]);

  return (
    <>
    <Toast toastList={list} position='top-right' />
    <Layout>
      <Routes>
        <Route path="/" element={ isLoggedIn ? <HomePage/> : <AuthPage/>} />
        {!isLoggedIn && <Route path="/login" element={<AuthPage/>} />}
        <Route path='*' element={<HomePage/>} />
      </Routes>
    </Layout>
    </>
  )
}

export default App