import { configureStore } from '@reduxjs/toolkit'
import symbolsReducer from '../features/symbolsSlice'
import tickersReducer from '../features/tickersSlice'



export const store = configureStore({
  reducer: {
    symbols: symbolsReducer,
    tickers: tickersReducer
  }
})

