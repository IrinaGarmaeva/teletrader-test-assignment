import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Ticker } from 'common/types';
import { useAuth } from 'context/AuthContext';
import LocalStorage from 'common/localStorage';
import { getTicker } from '../../../api';
import Button from '../../design-system/Button/Button';
import './Details.css';

function Details() {
  const [ticker, setTicker] = useState<Ticker>();
  const [favoriteList, setFavoriteList] = useState<string[]>([]);
  const [isFavorite, setIsFavorite] = useState<boolean>(false);

  const { isLoggedIn } = useAuth();
  const { symbol } = useParams<{ symbol?: string }>();

  const handleGetTicker = async () => {
    if (symbol) {
      const ticker: Ticker | null = await getTicker(symbol);
      if (ticker !== null) {
        setTicker(ticker);
      } else {
        throw new Error('Cant get ticker data');
      }
    }
  };

  const addToFavorites = (symbol: string) => {
    setIsFavorite(true);
    const newFavoriteList = [...favoriteList, symbol];
    LocalStorage.setItem('favouriteSymbols', newFavoriteList);
    const favouriteSymbolsFromLocalStorage = LocalStorage.getItem('favouriteSymbols');
    setFavoriteList(favouriteSymbolsFromLocalStorage);
  };

  const removeFromFavorites = (symbol: string) => {
    setIsFavorite(false);

    if (favoriteList.length) {
      LocalStorage.setItem(
        'favouriteSymbols',
        favoriteList.filter((el) => el !== symbol),
      );
      setFavoriteList(favoriteList.filter((el) => el !== symbol));
    }
  };

  useEffect(() => {
    const favoriteListFromLocalStorage: string[] | null | undefined = LocalStorage.getItem('favouriteSymbols');

    if (symbol) {
      const isSymbolInFavorites = favoriteListFromLocalStorage?.includes(symbol);
      if (isSymbolInFavorites) {
        setIsFavorite(true);
      }
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
      {isLoggedIn && !isFavorite && symbol && (
        <Button
          className="details__button"
          type="button"
          text="Add to favorites"
          onClick={() => addToFavorites(symbol)}
        />
      )}
      {isLoggedIn && isFavorite && symbol && (
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
