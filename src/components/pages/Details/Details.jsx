import { useParams } from 'react-router-dom'
import { getTicker } from '../../../api'
import './Details.css'
import { useState, useEffect } from 'react'
import { saveToLocalStorage, getFromLocalStorage } from '../../../common/localSrorageFunctions'
import Button from '../../design-system/Button/Button'
import { useAuth } from '../../../context/AuthContext'

const Details = () => {
  const [tickerData, setTickerData] = useState();
  const [favoriteList, setFavoriteList] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);

  const { isLoggedIn } = useAuth();
  const { symbol } = useParams()

  const handleGetTicker = async () => {
    const response = await getTicker(symbol)
    const data = response.data
    setTickerData(data)
  }

  const addToFavorites = () => {
    setIsFavorite(true)
    const newFavorites = [...favoriteList, symbol]
    saveToLocalStorage('favouriteSymbols', newFavorites)
    const dataFromLocalStorage =  getFromLocalStorage('favouriteSymbols')
    setFavoriteList(dataFromLocalStorage)
  }

  const removeFromFavorites = () => {
    setIsFavorite(false)
    const symbolToRemoveFromFavorites = symbol

    if (favoriteList.length) {
      saveToLocalStorage('favouriteSymbols', favoriteList.filter((symbol) => symbol !== symbolToRemoveFromFavorites))
      setFavoriteList(favoriteList.filter((item) => item !== symbolToRemoveFromFavorites))
    }
  }

  useEffect(() => {
    const favoriteListFromLocalStorage = getFromLocalStorage('favouriteSymbols')
    if(favoriteListFromLocalStorage?.includes(symbol)) {
      setIsFavorite(true)
    }
    setFavoriteList(favoriteListFromLocalStorage || [])
    handleGetTicker()
  }, [])

  return (
    <section className='details'>
      <table className='details__table'>
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
          <td>{tickerData?.last_price}</td>
          <td>{tickerData?.high}</td>
          <td>{tickerData?.low}</td>
          </tr>
        </tbody>
      </table>
    {isLoggedIn && !isFavorite && <Button className={'details__button'} type={"button"} text={"Add to favorites"} onClick={addToFavorites} />}
    {isLoggedIn && isFavorite && <Button className={'details__button'} type={"button"} text={"Remove from favorites"} onClick={removeFromFavorites} />}
    </section>
  )
}

export default Details
