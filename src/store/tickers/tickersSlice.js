import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    tickers: [],
    favouriteTickers: [],
    isLoading: false,
    errorText: null,
}

export const tickersSlice = createSlice({
  name: 'tickers',
  initialState,
  reducers: {
    setTickers: (state, action) => {
      const tickerIndex = state.tickers.findIndex((ticker) => {
        return ticker.chanId === action.payload.chanId
      })

      if(tickerIndex !== -1) {
        state.tickers = state.tickers.map((ticker) => {
          if(ticker.chanId === action.payload.chanId) {
            return {...ticker, ...action.payload}
          }
          return ticker
        })
      } else {
        state.tickers = [...state.tickers, action.payload]
      }
    },
  },
});

export const selectTickers = (state) => state.tickers.tickers;
export const selectTickersErrorText = (state) => state.tickers.errorText;
export const selectTickersLoadingStatus = (state) => state.tickers.isLoading;
export const { setTickers } = tickersSlice.actions

export default tickersSlice.reducer
