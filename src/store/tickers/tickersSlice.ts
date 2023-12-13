/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type TickerItem = {
  chanId: number;
  symbol?: string;
  pair?: string;
  values: number[];
};

export type TickersState = {
  tickers: TickerItem[];
  favouriteTickers: TickerItem[];
};

const initialState: TickersState = {
  tickers: [],
  favouriteTickers: [],
};

export const tickersSlice = createSlice({
  name: 'tickers',
  initialState,
  reducers: {
    setTickers: (
      state,
      action: PayloadAction<{
        chanId: number;
        symbol: string | undefined;
        pair: string;
        values: number[];
      }>,
      // action: PayloadAction<TickerItem>,
    ) => {
      const { payload } = action;
      const tickerIndex = state.tickers.findIndex(
        (ticker) => ticker.chanId === payload.chanId,
      );

      if (tickerIndex !== -1) {
        const updatedTicker = state.tickers.map(
          (ticker) => (ticker.chanId === payload.chanId ? { ...ticker, ...payload } : ticker),
        );
        state.tickers = updatedTicker;
      } else {
        state.tickers = [...state.tickers, action.payload];
      }
    },
    setFavouriteTickers: (state, action) => {
      const { payload } = action;
      const tickerIndex = state.favouriteTickers.findIndex(
        (ticker) => ticker.chanId === payload.chanId,
      );
      if (tickerIndex !== -1) {
        state.favouriteTickers = state.favouriteTickers.map(
          (ticker) => (ticker.chanId === payload.chanId ? { ...ticker, ...payload } : ticker),
        );
      } else {
        state.favouriteTickers = [...state.favouriteTickers, payload];
      }
    },
    resetTickers: (state) => {
      state.tickers = [];
    },
    resetFavouriteTickers: (state) => {
      state.favouriteTickers = [];
    },
  },
});

export const {
  setTickers,
  setFavouriteTickers,
  resetTickers,
  resetFavouriteTickers,
} = tickersSlice.actions;

export default tickersSlice.reducer;
