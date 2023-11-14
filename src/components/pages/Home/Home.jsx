import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import WebSocket from "websocket";
import {
  selectTickers,
  setTickers,
} from "../../../store/tickers/tickersSlice";
import { getCryptoPairNames } from "../../../api";
import Table from "../../design-system/Table/Table";
import Preloader from "../../design-system/Preloader/Preloader";
import "./Home.css";

const Home = () => {
  const [tickersToDisplay, setTickersToDisplay] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const dispatch = useDispatch();
  const tickers = useSelector(selectTickers);

  useEffect(() => {
    const w = new WebSocket.w3cwebsocket("wss://api-pub.bitfinex.com/ws/2");

    w.onopen = async () => {
      if(!tickers.length) {
        const firstFiveCryptoPairNames = await getCryptoPairNames()

        firstFiveCryptoPairNames.forEach((cryptoPairName) => {
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


  return (
    <section className="home">
      <div className="home__wrapper">
        {isLoading ? <Preloader /> : <Table />}
      </div>
    </section>
  );
};

export default Home;
