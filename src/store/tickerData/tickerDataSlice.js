import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getTickers = createAsyncThunk('tickers/getTickers', async (symbol) => {
  try {
    const response = await axios.get(`/ticker-by/${symbol}`)
    return response.data
  } catch (error) {
    console.error(`Error getting tickers: ${error.message}`)
  }
})

const initialState = {
    tickerData: [],
}

export const tickerDataSlice = createSlice({
  name: 'tickerData',
  initialState,
  extraReducers(builder){
    builder
      .addCase(getTickers.fulfilled, (state, action) => {
        console.log(action.payload)
        state.tickerData = action.payload
      })
  }
})

export const selectTickerData = (state) => state.tickerData.tickerData

export default tickerDataSlice.reducer
