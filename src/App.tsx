import React, { useEffect }  from 'react';
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useAuth } from "./context/AuthContext";
import Header from './components/layout/Header/Header'
import { ProtectedRoute } from "./components/layout/ProtectedRoute/ProtectedRoute";
import Home from "./components/pages/Home/Home";
import Details from "./components/pages/Details/Details";
import Favourites from "./components/pages/Favourites/Favourites";
import Footer from "./components/layout/Footer/Footer";
import { LocalStorage } from "./common/localStorage";

function App() {
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const isLoggedIn = LocalStorage.getFromLocalStorage('isLoggedIn')
    if(isLoggedIn) {
      setIsLoggedIn(true);
      navigate(location.pathname)
    } else {
      setIsLoggedIn(false)
    }
  }, [])

  return (
    <div className="root gradient__bg">
      <div className="page">
        <Header />
        <main className="main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/details/:symbol" element={<Details />} />
            <Route path="/favorites" element={<ProtectedRoute element={<Favourites />} isLoggedIn={isLoggedIn}/>} />
          </Routes>
        </main>
        <Footer />
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;
