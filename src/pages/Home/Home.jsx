import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

import { selectFiveSymbols, getSymbolsLoadingStatus, getSymbolsError, fetchFistFiveSymbols } from '../../features/cryptoSlice';
import './Home.css';
import Table from '../../components/Table/Table';
import Preloader from '../../components/Preloader/Preloader';


const Home = () => {
  const dispatch = useDispatch();
  const symbols = useSelector(selectFiveSymbols);
  const symbolsLoadingStatus = useSelector(getSymbolsLoadingStatus);
  const error = useSelector(getSymbolsError);

  useEffect(() => {
    dispatch(fetchFistFiveSymbols())
  }, [dispatch])

  return (
    <section className="home">
      {symbolsLoadingStatus ? (
        <Preloader />
      ) : (
        <Table symbols={symbols}/>
      )}
    </section>
  )
}

export default Home
