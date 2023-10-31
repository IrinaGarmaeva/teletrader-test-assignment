import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getSymbols } from "../store/ActionCreators";
import axios from "axios";

const initialState = {
  symbols: [],
  isLoading: false,
  error: null,
}

export const fetchFistFiveSymbols = createAsyncThunk('posts/fetchFistFiveSymbols', async () => {
  const response = await axios.get('/bitfinex-symbols', {
    headers: {
      accept: 'application/json'
    },
    withCredentials: true,
  });

  return response.data
})

export const cryptoSlice = createSlice({
  name: 'symbols',
  initialState,
  reducers: {},
  // extraReducers: {
  //   [getSymbols.pending]: (state) => {
  //     state.isLoading = true;
  //   },
  //   [getSymbols.fulfilled]: (state, action) => {
  //     state.isLoading = false;
  //     state.error = '';
  //     state.symbols = action.payload;
  //   },
  //   [getSymbols.rejected]: (state, action) => {
  //     state.isLoading = false;
  //     state.error = action.payload;
  //   },
  // }
  extraReducers(builder) {
    builder
      .addCase(fetchFistFiveSymbols.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchFistFiveSymbols.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = '';
        state.symbols = action.payload.slice(0, 5).map(symbol => symbol.toUpperCase());
      })
      .addCase(fetchFistFiveSymbols.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
  }
})

export const selectFiveSymbols = (state) => state.symbols.symbols;
export const getSymbolsLoadingStatus = (state) => state.symbols.isLoading;
export const getSymbolsError = (state) => state.symbols.error;

export default cryptoSlice.reducer
