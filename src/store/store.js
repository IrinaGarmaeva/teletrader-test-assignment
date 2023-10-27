import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { cryptoReducer } from './cryptoReducer';


const rootReducer = combineReducers({
  symbols: cryptoReducer,
})

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer
  })
}

