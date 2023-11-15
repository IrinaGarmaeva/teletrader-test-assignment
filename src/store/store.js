import { configureStore } from '@reduxjs/toolkit'
import tickersReducer from './tickers/tickersSlice'

export const store = configureStore({
  reducer: {
    tickers: tickersReducer,
  }
})

