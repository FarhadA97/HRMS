import { useEffect, useState } from 'react';
import {Route, Routes, useLocation} from 'react-router-dom';
import Layout from './components/Layout/Layout';
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';


const App = () => {

  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('user') ? true : false);

  useEffect(()=>{
    setIsLoggedIn(localStorage.getItem('user')?true:false);
  },[location]);

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        {!isLoggedIn && <Route path="/login" element={<AuthPage/>} />}
        <Route path='*' element={<HomePage/>} />
      </Routes>
    </Layout>
  )
}

export default App