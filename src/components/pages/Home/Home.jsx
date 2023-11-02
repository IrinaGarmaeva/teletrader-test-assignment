import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import WebSocket from "websocket";

import {
  selectCryptoPairNames,
  selectCryptoPairNamesLoadingStatus,
  selectCryptoPairNamesErrorText,
  getCryptoPairNames,
} from "../../../store/cryptoPairNames/cryptoPairNamesSlice";
import {
  selectTickers,
  getTickers,
} from "../../../store/tickers/tickersSlice";

import Table from "../../design-system/Table/Table";
import Preloader from "../../design-system/Preloader/Preloader";
import "./Home.css";

const Home = () => {
  const dispatch = useDispatch();
  const firstFiveCryptoPairNames = useSelector(selectCryptoPairNames).slice(0, 5).map(cryptoPairName => cryptoPairName.toUpperCase());
  const cryptoPairNameLoadingStatus = useSelector(selectCryptoPairNamesLoadingStatus);
  const cryptoPairNamesErrorText = useSelector(selectCryptoPairNamesErrorText);

  const tickers = useSelector(selectTickers);

  useEffect(() => {
    dispatch(getCryptoPairNames());
    return firstFiveCryptoPairNames.forEach((cryptoPairName) => dispatch(getTickers(cryptoPairName)));
  }, []);

  useEffect(() => {
    if (!firstFiveCryptoPairNames.length) {
      return;
    }

    const w = new WebSocket.w3cwebsocket("wss://api-pub.bitfinex.com/ws/2");

    w.onopen = () => {
      firstFiveCryptoPairNames.forEach((cryptoPairName) => {
        const payload = JSON.stringify({
          event: "subscribe",
          channel: "ticker",
          symbol: `t${cryptoPairName}`,
        });
        w.send(payload);
      });
    };

    w.onmessage = (message) => {
      const data = JSON.parse(message.data);
      //console.log('Received message from server:', message.data);
    };

    w.onclose = () => {
      console.log("WebSocket connection closed");
    };

    return () => {
      w.onclose();
    };
  }, [firstFiveCryptoPairNames]);

  return (
    <section className="home">
      <div className="home__wrapper">
        {cryptoPairNameLoadingStatus ? (
          <Preloader />
        ) : (
          <Table firstFiveCryptoPairNames={firstFiveCryptoPairNames} tickers={tickers} />
        )}
      </div>
    </section>
  );
};

export default Home;
