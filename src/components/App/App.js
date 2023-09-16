import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "../Header/Header";
import Home from "../../pages/Home/Home";
import Details from "../../pages/Details/Details";
import Favorites from "../../pages/Favorites/Favorites";
import Footer from "../Footer/Footer";
import { saveToLocalStorage, getFromLocalStorage } from "../../utils/localSrorageFunctions";

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
    console.log('clicked')
    const newState = !isLoggedIn
    setIsLoggedIn(newState);
    saveToLocalStorage('isLoggedIn', newState)
  }

  return (
    <div className="root gradient__bg">
      <div className="page">
        <Header handleLogin={handleLogin} isLoggedIn={isLoggedIn}/>
        <main className="main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/details" element={<Details />} />
            <Route path="/favorites" element={<Favorites />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </div>
  );
}

export default App;
