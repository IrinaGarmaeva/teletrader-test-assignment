import { createSlice } from "@reduxjs/toolkit";
import { getSymbols } from "../store/ActionCreators";

const initialState = {
  symbols: [],
  isLoading: false,
  error: null,
}

export const cryptoSlice = createSlice({
  name: 'crypto',
  initialState,
  reducers: {},
  extraReducers: {
    [getSymbols.pending]: (state) => {
      state.isLoading = true;
    },
    [getSymbols.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.error = '';
      state.symbols = action.payload;
    },
    [getSymbols.rejected]: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  }
})

export const { getSymbolsAction } = cryptoSlice.actions
