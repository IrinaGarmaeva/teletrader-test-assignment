import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  selectFavouriteTickers,
  setFavouriteTickers,
} from "../../../store/tickers/tickersSlice";
import { getFromLocalStorage } from "../../../common/localSrorageFunctions";
import Preloader from "../../design-system/Preloader/Preloader";
import Table from "../../design-system/Table/Table";
import "./Favourites.css";
import useWebSocket from "../../../hooks/useWebSocket";
import Button from "../../design-system/Button/Button";

const Favourites = () => {
  const navigate = useNavigate();
  const favouriteTickers = useSelector(selectFavouriteTickers);

  const favoriteListFromLocalStorage = getFromLocalStorage("favouriteSymbols");

  const { tickersToDisplay, isLoading } = useWebSocket({
    tickers: favouriteTickers,
    cryptoPairNames: favoriteListFromLocalStorage,
    setTickers: setFavouriteTickers,
  });
  const hasNoFavoriteSymbols = !favoriteListFromLocalStorage || !favoriteListFromLocalStorage.length;

  return (
    <section className="favorites">
      {hasNoFavoriteSymbols ? (
        <>
          <h2 className="favourites__title">
            You haven't added any symbols to Favourites
          </h2>
          <Button className={"favourites__button-back"} type={'button'} onClick={() => navigate(-1)} text={"Back"}/>
        </>
      ) : isLoading ? (
        <Preloader />
      ) : (
        <Table tickers={tickersToDisplay} />
      )}
    </section>
  );
};

export default Favourites;
