import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getTickers = createAsyncThunk('tickers/getTickers', async () => {
  try {
    const response = await axios.get(`/tickers`, {
      headers: {
        accept: 'application/json'
      },
      withCredentials: true,
    })
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
  reducers: {
    addChanIdToTicker: (state, action) => {
      const { symbol, chanId } = action.payload;
      const tickerIndex = state.tickers.findIndex((ticker) => ticker[0] === symbol);

      if (tickerIndex !== -1) {
        const ticker = state.tickers[tickerIndex];
        const updatedTicker = [chanId, ...ticker];
        state.tickers[tickerIndex] = updatedTicker;
      }
    },
    updateTicker: (state, action) => {
      const { chanId, data } = action.payload;
      const tickerToUpdate = state.tickers.find((ticker) => ticker[0] === chanId);

      if (tickerToUpdate) {
        state.tickers = state.tickers.map((ticker) =>
          ticker[0] === chanId ? [chanId, ...data] : ticker
        );
      }
    }
  },
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
});

export const selectAllTickers = (state) => state.tickers.tickers;
export const selectTickersErrorText = (state) => state.tickers.errorText;
export const selectTickersLoadingStatus = (state) => state.tickers.isLoading;
export const { addChanIdToTicker, updateTicker } = tickersSlice.actions

export default tickersSlice.reducer
