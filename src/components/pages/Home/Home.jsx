import { useSelector } from "react-redux"
import {
  selectTickers,
  setTickers,
  resetTickers
} from "../../../store/tickers/tickersSlice"
import { getFirstFiveSymbols } from "../../../api"
import Table from "../../design-system/Table/Table"
import Preloader from "../../design-system/Preloader/Preloader"
import useWebSocket from "../../../hooks/useWebSocket"
import "./Home.css"

const Home = () => {
  const tickers = useSelector(selectTickers);
  const { isLoading } = useWebSocket({ getSymbols: getFirstFiveSymbols, setTickers, resetTickers});

  return (
    <section className="home">
      <div className="home__wrapper">
        {isLoading ? <Preloader /> : <Table tickers={tickers}/>}
      </div>
    </section>
  );
};

export default Home
