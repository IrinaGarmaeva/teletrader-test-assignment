import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  selectFavouriteTickers,
  setFavouriteTickers,
  resetFavouriteTickers,
} from '../../../store/tickers/tickersSlice';
import { LocalStorage } from '../../../common/localStorage';
import Preloader from '../../design-system/Preloader/Preloader';
import Table from '../../design-system/Table/Table';
import './Favourites.css';
import useWebSocket from '../../../hooks/useWebSocket';
import Button from '../../design-system/Button/Button';

function Favourites() {
  const navigate = useNavigate();
  const favouriteTickers = useSelector(selectFavouriteTickers);
  const favoriteListFromLocalStorage = LocalStorage.getFromLocalStorage('favouriteSymbols');

  const { isLoading } = useWebSocket({
    symbols: favoriteListFromLocalStorage,
    setTickers: setFavouriteTickers,
    resetTickers: resetFavouriteTickers,
  });
  const hasNoFavoriteSymbols = !favoriteListFromLocalStorage || !favoriteListFromLocalStorage.length;

  return (
    <section className="favorites">
      {hasNoFavoriteSymbols ? (
        <>
          <h2 className="favourites__title">
            You haven't added any symbols to Favourites
          </h2>
          <Button className="favourites__button-back" type="button" onClick={() => navigate(-1)} text="Back" />
        </>
      ) : isLoading ? (
        <Preloader />
      ) : (
        <Table tickers={favouriteTickers} />
      )}
    </section>
  );
}

export default Favourites;
