import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  symbols: [],
  isLoading: false,
  error: null,
}

export const fetchSymbols = createAsyncThunk('symbols/fetchFistFiveSymbols', async () => {
  const response = await axios.get('/bitfinex-symbols', {
    headers: {
      accept: 'application/json'
    },
    withCredentials: true,
  });

  return response.data
})

export const symbolsSlice = createSlice({
  name: 'symbols',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchSymbols.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchSymbols.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = '';
        state.symbols = action.payload.slice(0, 5).map(symbol => symbol.toUpperCase());
      })
      .addCase(fetchSymbols.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
  }
})

export const selectFiveSymbols = (state) => state.symbols.symbols;
export const getSymbolsLoadingStatus = (state) => state.symbols.isLoading;
export const getSymbolsError = (state) => state.symbols.error;

export default symbolsSlice.reducer
