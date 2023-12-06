var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import WebSocket from "websocket";
import { WEBSOCKET_URL } from "../common/consts";
var useWebSocket = function (_a) {
    var symbols = _a.symbols, getSymbols = _a.getSymbols, setTickers = _a.setTickers, resetTickers = _a.resetTickers;
    var _b = useState(true), isLoading = _b[0], setIsLoading = _b[1];
    var dispatch = useDispatch();
    var location = useLocation();
    useEffect(function () {
        var w = new WebSocket.w3cwebsocket(WEBSOCKET_URL);
        w.onopen = function () { return __awaiter(void 0, void 0, void 0, function () {
            var firstFiveSymbols;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(location.pathname === "/")) return [3 /*break*/, 2];
                        return [4 /*yield*/, getSymbols()];
                    case 1:
                        firstFiveSymbols = _a.sent();
                        firstFiveSymbols.forEach(function (symbol) {
                            var payload = JSON.stringify({
                                event: "subscribe",
                                channel: "ticker",
                                symbol: "t".concat(symbol),
                            });
                            w.send(payload);
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        symbols === null || symbols === void 0 ? void 0 : symbols.forEach(function (symbol) {
                            var payload = JSON.stringify({
                                event: "subscribe",
                                channel: "ticker",
                                symbol: "t".concat(symbol),
                            });
                            w.send(payload);
                        });
                        _a.label = 3;
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        w.onmessage = function (message) {
            var data = JSON.parse(message.data);
            if ((data === null || data === void 0 ? void 0 : data.event) === "subscribed") {
                dispatch(setTickers({
                    chanId: data.chanId,
                    symbol: data.symbol,
                    pair: data.pair,
                    values: [],
                }));
            }
            else {
                if (data[1] === "hb") {
                    return;
                }
                if (Array.isArray(data)) {
                    var updatedTicker = {
                        chanId: data[0],
                        values: data[1],
                    };
                    dispatch(setTickers(updatedTicker));
                }
            }
            setIsLoading(false);
        };
        w.onclose = function () {
            dispatch(resetTickers());
        };
        return function () {
            w.close();
        };
    }, []);
    return { isLoading: isLoading };
};
export default useWebSocket;
