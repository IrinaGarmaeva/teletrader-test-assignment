import { useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux';
import io from 'socket.io-client';
import { Routes, Route } from "react-router-dom";

import Header from "../Header/Header";
import { ProtectedRoute } from "../ProtectedRoute/ProtectedRoute";
import Home from "../../pages/Home/Home";
import Details from "../../pages/Details/Details";
import Favorites from "../../pages/Favorites/Favorites";
import NotFound from "../../pages/NotFound/NotFound";
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

  /*
  useEffect(() => {
    const w = new WebSocket.w3cwebsocket('wss://api-pub.bitfinex.com/ws/2')

    w.onopen = async(symbol) => {
      let msg = JSON.stringify({
        event: 'subscribe',
        channel: 'ticker',
        symbol: 'tBTCUSD',
      });
      w.send(msg);
    };

    w.onmessage = (message) => {
      console.log('Received message from server:', message.data);
    };

    w.onclose = () => {
      console.log('WebSocket connection closed')
    }

    return () => {
      w.onclose()
    }
    }, [])
*/
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
