import { combineReducers, configureStore } from '@reduxjs/toolkit'
import cryptoReducer from '../features/cryptoSlice'

const rootReducer = combineReducers({
  symbols: cryptoReducer,
})

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer
  })
}

