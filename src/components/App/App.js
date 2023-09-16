import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Home from "../../pages/Home/Home";
import Details from "../../pages/Details/Details";
import Favorites from "../../pages/Favorites/Favorites";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="root">
      <div className="page">
        <Header />
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
