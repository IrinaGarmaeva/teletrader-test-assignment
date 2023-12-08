import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  tickers: [],
  favouriteTickers: [],
};

export const tickersSlice = createSlice({
  name: 'tickers',
  initialState,
  reducers: {
    setTickers: (state, action) => {
      const tickerIndex = state.tickers.findIndex((ticker) => ticker.chanId === action.payload.chanId);

      if (tickerIndex !== -1) {
        state.tickers = state.tickers.map((ticker) => (ticker.chanId === action.payload.chanId
          ? { ...ticker, ...action.payload }
          : ticker));
      } else {
        state.tickers = [...state.tickers, action.payload];
      }
    },
    setFavouriteTickers: (state, action) => {
      const tickerIndex = state.favouriteTickers.findIndex((ticker) => ticker.chanId === action.payload.chanId);
      if (tickerIndex !== -1) {
        state.favouriteTickers = state.favouriteTickers.map((ticker) => (ticker.chanId === action.payload.chanId
          ? { ...ticker, ...action.payload }
          : ticker));
      } else {
        state.favouriteTickers = [...state.favouriteTickers, action.payload];
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

export const selectTickers = (state) => state.tickers.tickers;
export const selectFavouriteTickers = (state) => state.tickers.favouriteTickers;
export const {
  setTickers, setFavouriteTickers, resetTickers, resetFavouriteTickers,
} = tickersSlice.actions;

export default tickersSlice.reducer;
