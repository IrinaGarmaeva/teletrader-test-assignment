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
    tickers: [],
    isLoading: false,
    errorText: null,
}

export const tickersSlice = createSlice({
  name: 'tickers',
  initialState,
  extraReducers(builder){
    builder
      .addCase(getTickers.fulfilled, (state, action) => {
        state.tickers = action.payload;
        state.isLoading = false;
        state.errorText = '';
      })
      .addCase(getTickers.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getTickers.rejected, (state, action) => {
        state.errorText = action.error.message;
        state.isLoading = false;
      })
  }
})

export const selectTickers = (state) => state.tickers.tickers;
export const selectTickersErrorText = (state) => state.tickers.errorText;
export const selectTickersLoadingStatus = (state) => state.tickers.isLoading;

export default tickersSlice.reducer
