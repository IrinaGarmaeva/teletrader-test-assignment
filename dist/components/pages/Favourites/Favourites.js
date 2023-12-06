import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectFavouriteTickers, setFavouriteTickers, resetFavouriteTickers } from "../../../store/tickers/tickersSlice";
import { LocalStorage } from "../../../common/localStorage";
import Preloader from "../../design-system/Preloader/Preloader";
import Table from "../../design-system/Table/Table";
import "./Favourites.css";
import useWebSocket from "../../../hooks/useWebSocket";
import Button from "../../design-system/Button/Button";
var Favourites = function () {
    var navigate = useNavigate();
    var favouriteTickers = useSelector(selectFavouriteTickers);
    var favoriteListFromLocalStorage = LocalStorage.getFromLocalStorage("favouriteSymbols");
    var isLoading = useWebSocket({
        symbols: favoriteListFromLocalStorage,
        setTickers: setFavouriteTickers,
        resetTickers: resetFavouriteTickers,
    }).isLoading;
    var hasNoFavoriteSymbols = !favoriteListFromLocalStorage || !favoriteListFromLocalStorage.length;
    return (React.createElement("section", { className: "favorites" }, hasNoFavoriteSymbols ? (React.createElement(React.Fragment, null,
        React.createElement("h2", { className: "favourites__title" }, "You haven't added any symbols to Favourites"),
        React.createElement(Button, { className: "favourites__button-back", type: 'button', onClick: function () { return navigate(-1); }, text: "Back" }))) : isLoading ? (React.createElement(Preloader, null)) : (React.createElement(Table, { tickers: favouriteTickers }))));
};
export default Favourites;
