import { useState, useEffect } from "react";
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
    //Create a socket connection to the server
    const socket = io('wss://api.bitfinex.com/ws/1', {
      extraHeaders: {
        origin: 'http://localhost:3001/'
      }
    });

//     const socket = io('ws://localhost:3001', {
//       extraHeaders: {
//         origin: 'ws://localhost:3001',
//     },
// });
    // const socket = io('ws://localhost:3000');
    //const socket = io('wss://api-pub.bitfinex.com/ws/1');

    // Listen for a custom event from the server
    socket.on('subscribe', (data) => {
      console.log('Received data from server:', data);
    });

    // Clean up the socket connection when the component unmounts
    return () => {
      socket.disconnect();
    };
  }, []);
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
