import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import WebSocket from 'websocket';
import { WEBSOCKET_URL } from 'common/consts';
import { type TickerItem } from '../store/tickers/tickersSlice';

export const setTickers = (ticker: TickerItem) => ({
  type: 'SET_TICKERS',
  payload: {
    chanId: ticker.chanId,
    symbol: ticker.symbol,
    pair: ticker.pair,
    values: ticker.values,
  } as TickerItem,
});

export const resetTickers = () => ({
  type: 'RESET_TICKERS',
});

type SetTickersAction = ReturnType<typeof setTickers>;
type ResetTickersAction = ReturnType<typeof resetTickers>;

type UseWebSocketProps = {
  symbols?: string[],
  getSymbols?: () => Promise<string[]>,
  setTickers: (ticker: TickerItem) => SetTickersAction,
  resetTickers: () => ResetTickersAction
};

const useWebSocket = ({
  symbols, getSymbols, setTickers, resetTickers,
}: UseWebSocketProps): { isLoading: boolean } => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const dispatch = useDispatch();
  const location = useLocation();

  useEffect(() => {
    // eslint-disable-next-line new-cap
    const w = new WebSocket.w3cwebsocket(WEBSOCKET_URL);

    w.onopen = async () => {
      if (getSymbols && location.pathname === '/') {
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
      let initialData : string;

      if (typeof message.data === 'string') {
        initialData = message.data;
      } else if (message.data instanceof Buffer) {
        initialData = message.data.toString('utf-8');
      } else {
        throw new Error('Unexpected message data type');
      }
      const data = JSON.parse(initialData);

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
