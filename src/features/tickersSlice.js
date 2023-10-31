import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import { getSymbolData } from "../utils/api";
import axios from "axios";

export const fetchSymbolsData = createAsyncThunk('tickers/fetchSymbolsData', async (symbol) => {
  const response = await axios.get(`/bitfinex-pubticker/${symbol}`)
  return response.data
})


const initialState = {
    tickerData: [],
    // tickerSymbols: [],
    // favorites: [],
}

export const tickersSlice = createSlice({
  name: 'tickers',
  initialState,
  reducers: {},
  extraReducers(builder){
    builder
      .addCase(fetchSymbolsData.fulfilled, (state, action) => {
        console.log(action.payload)
        state.tickerData = action.payload
      })
  }
})

export const selectTickers = (state) => state.tickers.tickerData

export default tickersSlice.reducer
