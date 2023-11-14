import { useSelector } from "react-redux"
import {
  selectTickers,
  setTickers,
} from "../../../store/tickers/tickersSlice"
import { getCryptoPairNames } from "../../../api"
import Table from "../../design-system/Table/Table"
import Preloader from "../../design-system/Preloader/Preloader"
import useWebSocket from "../../../hooks/useWebSocket"
import "./Home.css"

const Home = () => {
  const tickers = useSelector(selectTickers);
  const { tickersToDisplay, isLoading } = useWebSocket({tickers, getCryptoPairNames, setTickers});

  return (
    <section className="home">
      <div className="home__wrapper">
        {isLoading ? <Preloader /> : <Table tickers={tickersToDisplay}/>}
      </div>
    </section>
  );
};

export default Home
