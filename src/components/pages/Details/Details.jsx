import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getTicker } from '../../../api';
import { LocalStorage } from '../../../common/localStorage';
import Button from '../../design-system/Button/Button';
import { useAuth } from '../../../context/AuthContext';
import './Details.css';

function Details() {
  const [ticker, setTicker] = useState();
  const [favoriteList, setFavoriteList] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);

  const { isLoggedIn } = useAuth();
  const { symbol } = useParams();

  const handleGetTicker = async () => {
    const ticker = await getTicker(symbol);
    setTicker(ticker);
  };

  const addToFavorites = (symbol) => {
    setIsFavorite(true);
    const newFavoriteList = [...favoriteList, symbol];
    LocalStorage.saveToLocalStorage('favouriteSymbols', newFavoriteList);
    const favouriteSymbolsFromLocalStorage = LocalStorage.getFromLocalStorage('favouriteSymbols');
    setFavoriteList(favouriteSymbolsFromLocalStorage);
  };

  const removeFromFavorites = (symbol) => {
    setIsFavorite(false);

    if (favoriteList.length) {
      LocalStorage.saveToLocalStorage(
        'favouriteSymbols',
        favoriteList.filter((el) => el !== symbol),
      );
      setFavoriteList(favoriteList.filter((el) => el !== symbol));
    }
  };

  useEffect(() => {
    const favoriteListFromLocalStorage = LocalStorage.getFromLocalStorage('favouriteSymbols');
    if (favoriteListFromLocalStorage?.includes(symbol)) {
      setIsFavorite(true);
    }
    setFavoriteList(favoriteListFromLocalStorage || []);
    handleGetTicker();
  }, []);

  return (
    <section className="details">
      <table className="details__table">
        <thead>
          <tr>
            <th scope="col">Symbol</th>
            <th scope="col">Last price</th>
            <th scope="col">High</th>
            <th scope="col">Low</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{symbol}</td>
            <td>{ticker?.last_price}</td>
            <td>{ticker?.high}</td>
            <td>{ticker?.low}</td>
          </tr>
        </tbody>
      </table>
      {isLoggedIn && !isFavorite && (
        <Button
          className="details__button"
          type="button"
          text="Add to favorites"
          onClick={() => addToFavorites(symbol)}
        />
      )}
      {isLoggedIn && isFavorite && (
        <Button
          className="details__button"
          type="button"
          text="Remove from favorites"
          onClick={() => removeFromFavorites(symbol)}
        />
      )}
    </section>
  );
}

export default Details;
