import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import WebSocket from 'websocket';
import { WEBSOCKET_URL } from '../common/consts';

type Ticker = {
  chanId: number,
  symbol: string,
  pair: string,
  values: number[],
};

type UseWebSocketProps = {
  symbols: string[],
  getSymbols: () => Promise<string[]>,
  setTickers: (ticker: Ticker) => void,
  resetTickers: () => void,
};

const useWebSocket = ({
  symbols, getSymbols, setTickers, resetTickers,
}: UseWebSocketProps): boolean => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    const w = new WebSocket.w3cwebsocket(WEBSOCKET_URL);

    w.onopen = async () => {
      if (location.pathname === '/') {
        const firstFiveSymbols = await getSymbols();
        firstFiveSymbols.forEach((symbol) => {
          const payload = JSON.stringify({
            event: 'subscribe',
            channel: 'ticker',
            symbol: `t${symbol}`,
          });
          w.send(payload);
        });
      } else {
        symbols?.forEach((symbol) => {
          const payload = JSON.stringify({
            event: 'subscribe',
            channel: 'ticker',
            symbol: `t${symbol}`,
          });
          w.send(payload);
        });
      }
    };

    w.onmessage = (message) => {
      const data = JSON.parse(message.data);

      if (data?.event === 'subscribed') {
        dispatch(
          setTickers({
            chanId: data.chanId,
            symbol: data.symbol,
            pair: data.pair,
            values: [],
          }),
        );
      } else {
        if (data[1] === 'hb') {
          return;
        }
        if (Array.isArray(data)) {
          const updatedTicker = {
            chanId: data[0],
            values: data[1],
          };
          dispatch(setTickers(updatedTicker));
        }
      }
      setIsLoading(false);
    };

    w.onclose = () => {
      dispatch(resetTickers());
    };

    return () => {
      w.close();
    };
  }, []);

  return { isLoading };
};

export default useWebSocket;
