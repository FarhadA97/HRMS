import { useEffect } from 'react';
import {Route, Routes} from 'react-router-dom';
import Layout from './components/Layout/Layout';
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';


const App = () => {

  const isLoggedIn = localStorage.getItem('user') ? true : false;

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