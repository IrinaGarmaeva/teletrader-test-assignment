import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  cryptoPairNames: [],
  isLoading: false,
  errorText: null,
}

export const getCryptoPairNames = createAsyncThunk('cryptoPairNames/getCryptoPairNames', async () => {
  try {
    const response = await axios.get('/symbols', {
      headers: {
        accept: 'application/json'
      },
      withCredentials: true,
    });
    return response.data
  } catch (error) {
    console.error(`Error getting crypto pair names: ${error.message}`)
  }
})

export const cryptoPairNamesSlice = createSlice({
  name: 'cryptoPairNames',
  initialState,
  extraReducers(builder) {
    builder
      .addCase(getCryptoPairNames.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(getCryptoPairNames.fulfilled, (state, action) => {
        state.isLoading = false;
        state.errorText = '';
        state.cryptoPairNames = action.payload;
      })
      .addCase(getCryptoPairNames.rejected, (state, action) => {
        state.isLoading = false;
        state.errorText = action.error.message;
      })
  }
})

export const selectCryptoPairNames = (state) => state.cryptoPairNames.cryptoPairNames;
export const getCryptoPairNamesLoadingStatus = (state) => state.cryptoPairNames.isLoading;
export const getCryptoPairNamesErrorText = (state) => state.cryptoPairNames.errorText;

export default cryptoPairNamesSlice.reducer
