import { configureStore } from '@reduxjs/toolkit';
import tickersReducer from './tickers/tickersSlice';
export var store = configureStore({
    reducer: {
        tickers: tickersReducer,
    }
});
