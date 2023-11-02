import { configureStore } from '@reduxjs/toolkit'
import cryptoPairNamesReducer from './cryptoPairNames/cryptoPairNamesSlice'
import tickersReducer from './tickers/tickersSlice'



export const store = configureStore({
  reducer: {
    cryptoPairNames: cryptoPairNamesReducer,
    tickers: tickersReducer
  }
})

