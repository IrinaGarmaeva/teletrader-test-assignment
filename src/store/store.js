import { configureStore } from '@reduxjs/toolkit'
import cryptoPairNamesReducer from './cryptoPairNames/cryptoPairNamesSlice'
import tickerDataReducer from './tickerData/tickerDataSlice'



export const store = configureStore({
  reducer: {
    cryptoPairNames: cryptoPairNamesReducer,
    tickerData: tickerDataReducer
  }
})

