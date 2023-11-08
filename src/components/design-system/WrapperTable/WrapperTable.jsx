import Table from "../Table/Table"
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import WebSocket from "websocket";

import { selectCryptoPairNames } from "../../../store/cryptoPairNames/cryptoPairNamesSlice";
import { selectAllTickers } from "../../../store/tickers/tickersSlice";


const WrapperTable = () => {
  const firstFiveCryptoPairNames = useSelector(selectCryptoPairNames)
    .slice(0, 5)
    .map((cryptoPairName) => cryptoPairName.toUpperCase());

    const allTickers = useSelector(selectAllTickers);

  const getSelectedTickers = () => {
    return firstFiveCryptoPairNames.map((cryptoPairName) => {
      return allTickers.find((ticker) => ticker[0] === `t${cryptoPairName}`);
    });
  }

  const getTickersToDisplay = (tickers) => {
    //const tickerIndexesToDisplay = [0, 7, 5, 6, 9, 10];
    const tickerIndexesToDisplay = [0, 1, 8, 6, 7, 10, 11]; // 0 - это chanId
    return tickers?.map((ticker) =>
      tickerIndexesToDisplay.map((index) => ticker[index])
    );
  };

  const [selectedTickers, setSelectedTickers] = useState(getSelectedTickers()); // getSelectedTickers(allTickers)
  const [tickersToDisplay, setTickersToDisplay] = useState(getTickersToDisplay(getSelectedTickers())); //getTickersToDisplay(getSelectedTickers())

  useEffect(() => {
    setSelectedTickers(getSelectedTickers())
    setTickersToDisplay(getTickersToDisplay(getSelectedTickers()))

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

        const tickerIndex = selectedTickers.findIndex((ticker) => {
          return ticker[0] === symbol
        });

        if(tickerIndex !== -1) {
          setSelectedTickers((prevTickers) => {
          return prevTickers.map((ticker) => {
            if (ticker[0] === `t${symbol}`) {
              return [chanId, ...ticker];
            }
            return ticker;
          });
        });
        }
      } else {
        if(data[1] === 'hb') {
          return
        }
        if(Array.isArray(data)) {
          const chanId = data[0]
          const updatedTicker = data[1]

          const updatedTickers = selectedTickers.map((ticker) => {
            if (ticker[0] === chanId) {
              return [chanId, ...updatedTicker];
            }
            return ticker;
          });

          setSelectedTickers(updatedTickers);
          setTickersToDisplay(getTickersToDisplay(selectedTickers))
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

  return (
      <Table tickersToDisplay={tickersToDisplay} />
  )
}

export default WrapperTable
