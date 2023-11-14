import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {  useDispatch } from "react-redux";
import WebSocket from "websocket"

const useWebSocket = ({ tickers, cryptoPairNames, getCryptoPairNames, setTickers}) => {
  const [tickersToDisplay, setTickersToDisplay] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    const w = new WebSocket.w3cwebsocket("wss://api-pub.bitfinex.com/ws/2");

    w.onopen = async () => {
      if (location.pathname === "/") {
        const firstFiveCryptoPairNames = await getCryptoPairNames();
        firstFiveCryptoPairNames.forEach((cryptoPairName) => {
          const payload = JSON.stringify({
            event: "subscribe",
            channel: "ticker",
            symbol: `t${cryptoPairName}`,
          });
          w.send(payload);
        });
      } else {
        cryptoPairNames?.forEach((cryptoPairName) => {
          const payload = JSON.stringify({
            event: "subscribe",
            channel: "ticker",
            symbol: `t${cryptoPairName}`,
          });
          w.send(payload);
        });
      }
    };

    w.onmessage = (message) => {
      const data = JSON.parse(message.data);

      if (data?.event === "subscribed") {
        dispatch(
          setTickers({
            chanId: data.chanId,
            symbol: data.symbol,
            pair: data.pair,
            values: [],
          })
        );
      } else {
        if (data[1] === "hb") {
          return;
        }
        if (Array.isArray(data)) {
          const updatedTicker = {
            chanId: data[0],
            values: data[1],
          };
          dispatch(setTickers(updatedTicker));
        }
      }
      setIsLoading(false)
    };

    w.onclose = () => {
      console.log("WebSocket connection closed");
    };

    return () => {
      w.onclose();
    };

  }, []);

  useEffect(() => {
    setTickersToDisplay(tickers);
  }, [tickers]);

  return { tickersToDisplay, isLoading };
};

export default useWebSocket;
