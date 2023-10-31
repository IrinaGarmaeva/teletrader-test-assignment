import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import WebSocket from 'websocket';


import { selectFiveSymbols, getSymbolsLoadingStatus, getSymbolsError, fetchSymbols } from '../../features/symbolsSlice';
import { selectTickers, fetchSymbolsData} from '../../features/tickersSlice';
import './Home.css';
import Table from '../../components/Table/Table';
import Preloader from '../../components/Preloader/Preloader';


const Home = () => {
  const dispatch = useDispatch();
  const symbols = useSelector(selectFiveSymbols);
  const symbolsLoadingStatus = useSelector(getSymbolsLoadingStatus);
  const error = useSelector(getSymbolsError);

  const symbolsData = useSelector(selectTickers)

  useEffect(() => {
    dispatch(fetchSymbols())

    //dispatch(fetchSymbolsData("BTCUSD"))
  }, [dispatch])

  useEffect(() => {
    console.log(symbols)
    return symbols.forEach((symbol) => dispatch(fetchSymbolsData(symbol)))
  }, [])

  useEffect(() => {
    console.log(symbols)
    if (!symbols || symbols.length === 0) {
      return
    }

    const w = new WebSocket.w3cwebsocket('wss://api-pub.bitfinex.com/ws/2')

    w.onopen = () => {
      symbols.forEach(symbol => {
        const payload = JSON.stringify({
          event: 'subscribe',
          channel: 'ticker',
          symbol: `t${symbol}`
        })
        w.send(payload)
      })
    };

    w.onmessage = (message) => {
      const data = JSON.parse(message.data)
      console.log(data)
      //console.log('Received message from server:', message.data);
    };

    w.onclose = () => {
      console.log('WebSocket connection closed')
    }

    return () => {
      w.onclose()
    }
    }, [symbols])

  return (
    <section className="home">
      {symbolsLoadingStatus ? (
        <Preloader />
      ) : (
        <Table symbols={symbols} symbolsData={symbolsData} />
       // <Table symbols={symbols} />
      )}
    </section>
  )
}

export default Home
