import { configureStore } from '@reduxjs/toolkit'
import symbolsReducer from '../features/cryptoSlice'



export const store = configureStore({
  reducer: {
    symbols: symbolsReducer,
  }
})

