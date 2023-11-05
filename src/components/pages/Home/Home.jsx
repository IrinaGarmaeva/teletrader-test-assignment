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
  selectAllTickers,
  getTickers,
  addChanIdToTicker,
  updateTicker
} from "../../../store/tickers/tickersSlice";

import Table from "../../design-system/Table/Table";
import Preloader from "../../design-system/Preloader/Preloader";
import "./Home.css";

const Home = () => {
  const dispatch = useDispatch();
  const firstFiveCryptoPairNames = useSelector(selectCryptoPairNames)
    .slice(0, 5)
    .map((cryptoPairName) => cryptoPairName.toUpperCase());
  const cryptoPairNameLoadingStatus = useSelector(
    selectCryptoPairNamesLoadingStatus
  );
  const cryptoPairNamesErrorText = useSelector(selectCryptoPairNamesErrorText);

  const allTickers = useSelector(selectAllTickers);

  useEffect(() => {
    dispatch(getCryptoPairNames());
    dispatch(getTickers());
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

      if (data?.event === "subscribed") {
        const symbol = data.symbol;
        const chanId = data.chanId;
        dispatch(addChanIdToTicker({ symbol, chanId }));
      } else {
        if(data[1] === 'hb') {
          return
        }
        if(Array.isArray(data)) {
          const updatedTicker = {
            chanId: data[0],
            data: data[1]
          }
          dispatch(updateTicker(updatedTicker))
        }
      }
    };
    w.onclose = () => {
      console.log("WebSocket connection closed");
    };

    return () => {
      w.onclose();
    };
  }, [firstFiveCryptoPairNames]);

  const selectedTickers = firstFiveCryptoPairNames.map((cryptoPairName) => {
    return allTickers.find((ticker) => ticker[0] === `t${cryptoPairName}`);
  });

  return (
    <section className="home">
      <div className="home__wrapper">
        {cryptoPairNameLoadingStatus ? (
          <Preloader />
        ) : (
          <Table selectedTickers={selectedTickers} />
        )}
      </div>
    </section>
  );
};

export default Home;
