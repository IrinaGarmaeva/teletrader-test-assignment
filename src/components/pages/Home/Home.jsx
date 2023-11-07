import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
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
} from "../../../store/tickers/tickersSlice";

import Table from "../../design-system/Table/Table";
import Preloader from "../../design-system/Preloader/Preloader";
import "./Home.css";

const Home = () => {
  const [tickersToDisplay, setTickersToDisplay] = useState([]);
  const [selectedTickers, setSelectedTickers] = useState([]);

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

        //dispatch(addChanIdToTicker({ symbol, chanId }));
        const tickerIndex = selectedTickers.findIndex((ticker) => ticker[0] === symbol);

        if(tickerIndex !== -1) {
          setSelectedTickers((prevTickers) => {
            const updatedTickers = [...prevTickers];
            const ticker = updatedTickers[tickerIndex];
            const updatedTicker = [chanId, ...ticker];
            updatedTickers[tickerIndex] = updatedTicker;
            return updatedTickers;
          });
        }
      } else {
        if(data[1] === 'hb') {
          return
        }
        if(Array.isArray(data)) {
          const chanId = data[0]
          const updatedTicker = data[1]

          //dispatch(updateTicker(updatedTicker))
          const updatedTickers = selectedTickers.map((ticker) => {
            if (ticker[0] === chanId) {
              return [chanId, ...updatedTicker];
            }
            return ticker;
          });

          setSelectedTickers(updatedTickers);
        }
      }
    };
    w.onclose = () => {
      console.log("WebSocket connection closed");
    };

    return () => {
      w.onclose();
    };
  }, []);

  const getTickersToDisplay = (tickers) => {
    //const tickerIndexesToDisplay = [0, 7, 5, 6, 9, 10];
    const tickerIndexesToDisplay = [0, 1, 8, 6, 7, 10, 11]; // 0 - это chanId
    return tickers?.map((ticker) =>
      tickerIndexesToDisplay.map((index) => ticker[index])
    );
  };

  const getSelectedTickers = () => {
    return firstFiveCryptoPairNames.map((cryptoPairName) => {
      return allTickers.find((ticker) => ticker[0] === `t${cryptoPairName}`);
    });
  }

  useEffect(() => {
    setSelectedTickers(getSelectedTickers())
    setTickersToDisplay(getTickersToDisplay(selectedTickers));
  }, [selectedTickers]);

  return (
    <section className="home">
      <div className="home__wrapper">
        {cryptoPairNameLoadingStatus ? (
          <Preloader />
        ) : (
          <Table selectedTickers={tickersToDisplay} />
        )}
      </div>
    </section>
  );
};

export default Home;
