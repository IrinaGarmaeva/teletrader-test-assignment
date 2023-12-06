var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var _a;
import { createSlice } from "@reduxjs/toolkit";
var initialState = {
    tickers: [],
    favouriteTickers: [],
};
export var tickersSlice = createSlice({
    name: 'tickers',
    initialState: initialState,
    reducers: {
        setTickers: function (state, action) {
            var tickerIndex = state.tickers.findIndex(function (ticker) {
                return ticker.chanId === action.payload.chanId;
            });
            if (tickerIndex !== -1) {
                state.tickers = state.tickers.map(function (ticker) {
                    return ticker.chanId === action.payload.chanId
                        ? __assign(__assign({}, ticker), action.payload) : ticker;
                });
            }
            else {
                state.tickers = __spreadArray(__spreadArray([], state.tickers, true), [action.payload], false);
            }
        },
        setFavouriteTickers: function (state, action) {
            var tickerIndex = state.favouriteTickers.findIndex(function (ticker) {
                return ticker.chanId === action.payload.chanId;
            });
            if (tickerIndex !== -1) {
                state.favouriteTickers = state.favouriteTickers.map(function (ticker) {
                    return ticker.chanId === action.payload.chanId
                        ? __assign(__assign({}, ticker), action.payload) : ticker;
                });
            }
            else {
                state.favouriteTickers = __spreadArray(__spreadArray([], state.favouriteTickers, true), [action.payload], false);
            }
        },
        resetTickers: function (state) {
            state.tickers = [];
        },
        resetFavouriteTickers: function (state) {
            state.favouriteTickers = [];
        }
    },
});
export var selectTickers = function (state) { return state.tickers.tickers; };
export var selectFavouriteTickers = function (state) { return state.tickers.favouriteTickers; };
export var setTickers = (_a = tickersSlice.actions, _a.setTickers), setFavouriteTickers = _a.setFavouriteTickers, resetTickers = _a.resetTickers, resetFavouriteTickers = _a.resetFavouriteTickers;
export default tickersSlice.reducer;
