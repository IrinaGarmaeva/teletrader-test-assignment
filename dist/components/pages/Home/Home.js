import { useSelector } from "react-redux";
import { selectTickers, setTickers, resetTickers } from "../../../store/tickers/tickersSlice";
import { getFirstFiveSymbols } from "../../../api";
import Table from "../../design-system/Table/Table";
import Preloader from "../../design-system/Preloader/Preloader";
import useWebSocket from "../../../hooks/useWebSocket";
import "./Home.css";
var Home = function () {
    var tickers = useSelector(selectTickers);
    var isLoading = useWebSocket({ getSymbols: getFirstFiveSymbols, setTickers: setTickers, resetTickers: resetTickers }).isLoading;
    return (React.createElement("section", { className: "home" },
        React.createElement("div", { className: "home__wrapper" }, isLoading ? React.createElement(Preloader, null) : React.createElement(Table, { tickers: tickers }))));
};
export default Home;
