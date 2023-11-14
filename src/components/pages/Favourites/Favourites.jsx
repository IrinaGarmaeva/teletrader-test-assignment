import { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux";
import { selectTickers,  } from "../../../store/tickers/tickersSlice";
import { getFromLocalStorage } from "../../../common/localSrorageFunctions"
import Table from "../../design-system/Table/Table"
import './Favourites.css'

const Favourites = () => {
  const [favouriteSymbols, setFavouriteSymbols] = useState([])
  const [favouriteTickers, setFavouriteTickers] = useState([])

  const dispatch = useDispatch();
  const tickers = useSelector(selectTickers)

  const findTickersByFavoritePairs = (tickers, favouriteSymbols) => {
    const foundTickers = tickers.filter(ticker => favouriteSymbols.includes(ticker.pair));
    return foundTickers;
  };

  useEffect(() => {
    const favoriteListFromLocalStorage = getFromLocalStorage('favouriteSymbols')
    if(favoriteListFromLocalStorage){
      setFavouriteSymbols(favoriteListFromLocalStorage)

      setFavouriteTickers(findTickersByFavoritePairs(tickers, favouriteSymbols))
    }
  }, [])

  return (
    <section className="favorites">
      <Table tickers={favouriteTickers}/>
    </section>
  )
}

export default Favourites
