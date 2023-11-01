import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import WebSocket from "websocket";

import {
  selectCryptoPairNames,
  getCryptoPairNamesLoadingStatus,
  getCryptoPairNamesError,
  getCryptoPairNames,
} from "../../../store/cryptoPairNames/cryptoPairNamesSlice";
import {
  selectTickerData,
  getTickers,
} from "../../../store/tickerData/tickerDataSlice";

import Table from "../../design-system/Table/Table";
import Preloader from "../../design-system/Preloader/Preloader";
import "./Home.css";

const Home = () => {
  const dispatch = useDispatch();
  const firstFiveCryptoPairNames = useSelector(selectCryptoPairNames).slice(0, 5).map(cryptoPairName => cryptoPairName.toUpperCase());
  const cryptoPairNameLoadingStatus = useSelector(getCryptoPairNamesLoadingStatus);
  const cryptoPairNamesError = useSelector(getCryptoPairNamesError);

  const tickerData = useSelector(selectTickerData);

  useEffect(() => {
    dispatch(getCryptoPairNames());
  }, [dispatch]);

  useEffect(() => {
    console.log(firstFiveCryptoPairNames);
    return firstFiveCryptoPairNames.forEach((cryptoPairName) => dispatch(getTickers(cryptoPairName)));
  }, []);

  useEffect(() => {
    console.log(firstFiveCryptoPairNames);
    if (!firstFiveCryptoPairNames || firstFiveCryptoPairNames.length === 0) {
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
      console.log(data);
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
          <Table firstFiveCryptoPairNames={firstFiveCryptoPairNames} cryptoPairData={tickerData} />
        )}
      </div>
    </section>
  );
};

export default Home;
