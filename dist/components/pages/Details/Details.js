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
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
import { useParams } from "react-router-dom";
import { getTicker } from "../../../api";
import "./Details.css";
import { useState, useEffect } from "react";
import { LocalStorage } from "../../../common/localStorage";
import Button from "../../design-system/Button/Button";
import { useAuth } from "../../../context/AuthContext";
var Details = function () {
    var _a = useState(), ticker = _a[0], setTicker = _a[1];
    var _b = useState([]), favoriteList = _b[0], setFavoriteList = _b[1];
    var _c = useState(false), isFavorite = _c[0], setIsFavorite = _c[1];
    var isLoggedIn = useAuth().isLoggedIn;
    var symbol = useParams().symbol;
    var handleGetTicker = function () { return __awaiter(void 0, void 0, void 0, function () {
        var ticker;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, getTicker(symbol)];
                case 1:
                    ticker = _a.sent();
                    setTicker(ticker);
                    return [2 /*return*/];
            }
        });
    }); };
    var addToFavorites = function (symbol) {
        setIsFavorite(true);
        var newFavoriteList = __spreadArray(__spreadArray([], favoriteList, true), [symbol], false);
        LocalStorage.saveToLocalStorage("favouriteSymbols", newFavoriteList);
        var favouriteSymbolsFromLocalStorage = LocalStorage.getFromLocalStorage("favouriteSymbols");
        setFavoriteList(favouriteSymbolsFromLocalStorage);
    };
    var removeFromFavorites = function (symbol) {
        setIsFavorite(false);
        if (favoriteList.length) {
            LocalStorage.saveToLocalStorage("favouriteSymbols", favoriteList.filter(function (el) { return el !== symbol; }));
            setFavoriteList(favoriteList.filter(function (el) { return el !== symbol; }));
        }
    };
    useEffect(function () {
        var favoriteListFromLocalStorage = LocalStorage.getFromLocalStorage("favouriteSymbols");
        if (favoriteListFromLocalStorage === null || favoriteListFromLocalStorage === void 0 ? void 0 : favoriteListFromLocalStorage.includes(symbol)) {
            setIsFavorite(true);
        }
        setFavoriteList(favoriteListFromLocalStorage || []);
        handleGetTicker();
    }, []);
    return (React.createElement("section", { className: "details" },
        React.createElement("table", { className: "details__table" },
            React.createElement("thead", null,
                React.createElement("tr", null,
                    React.createElement("th", { scope: "col" }, "Symbol"),
                    React.createElement("th", { scope: "col" }, "Last price"),
                    React.createElement("th", { scope: "col" }, "High"),
                    React.createElement("th", { scope: "col" }, "Low"))),
            React.createElement("tbody", null,
                React.createElement("tr", null,
                    React.createElement("td", null, symbol),
                    React.createElement("td", null, ticker === null || ticker === void 0 ? void 0 : ticker.last_price),
                    React.createElement("td", null, ticker === null || ticker === void 0 ? void 0 : ticker.high),
                    React.createElement("td", null, ticker === null || ticker === void 0 ? void 0 : ticker.low)))),
        isLoggedIn && !isFavorite && (React.createElement(Button, { className: "details__button", type: "button", text: "Add to favorites", onClick: function () { return addToFavorites(symbol); } })),
        isLoggedIn && isFavorite && (React.createElement(Button, { className: "details__button", type: "button", text: "Remove from favorites", onClick: function () { return removeFromFavorites(symbol); } }))));
};
export default Details;
