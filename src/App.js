import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Routes, Route } from "react-router-dom";

import Header from './components/layout/Header/Header'
import { ProtectedRoute } from "./components/layout/ProtectedRoute/ProtectedRoute";
import Home from "./components/pages/Home/Home";
import Details from "./components/pages/Details/Details";
import Favorites from "./components/pages/Favorites/Favorites";
import NotFound from "./components/pages/NotFound/NotFound";
import Footer from "./components/layout/Footer/Footer";
import { saveToLocalStorage, getFromLocalStorage } from "./utils/localSrorageFunctions";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const data = getFromLocalStorage('isLoggedIn')
    if(data) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false)
    }
  }, [])

  const handleLogin = () => {
    const newState = !isLoggedIn;
    setIsLoggedIn(newState);
    saveToLocalStorage('isLoggedIn', newState);
  }

  return (
    <div className="root gradient__bg">
      <div className="page">
        <Header handleLogin={handleLogin} isLoggedIn={isLoggedIn}/>
        <main className="main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/details/:symbol" element={<Details />} />
            <Route path="/favorites" element={<ProtectedRoute element={<Favorites />} isLoggedIn={isLoggedIn}/>} />
            {/* <Route path="/*" element={<NotFound />} /> */}
          </Routes>
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;
