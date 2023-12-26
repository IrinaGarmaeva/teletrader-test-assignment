import React from 'react';
import {
  setTickers,
  resetTickers,
} from '../../../store/tickers/tickersSlice';
import { useTickersSelector } from '../../../store/hooks';
import { getFirstFiveSymbols } from '../../../api';
import Table from '../../design-system/Table/Table';
import Preloader from '../../design-system/Preloader/Preloader';
import useWebSocket from '../../../hooks/useWebSocket';
import './Home.css';

function Home() {
  const tickers = useTickersSelector((state) => state.tickers.tickers);
  const { isLoading } = useWebSocket({ getSymbols: getFirstFiveSymbols, setTickers, resetTickers });

  return (
    <section className="home">
      <div className="home__wrapper">
        {isLoading ? <Preloader /> : <Table tickers={tickers} />}
      </div>
    </section>
  );
}

export default Home;
