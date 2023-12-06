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
import "./Table.css";
import { useNavigate } from "react-router-dom";
import { formatTickers } from "../../../common/tickerFormatter";
var Table = function (_a) {
    var tickers = _a.tickers;
    var navigate = useNavigate();
    var getTickersValuesToDisplay = function (tickers) {
        var tickersWithSelectedValues = tickers.map(function (ticker) {
            var values = ticker.values.filter(function (_, index) {
                return [0, 7, 5, 6, 9, 10].includes(index);
            });
            return __assign(__assign({}, ticker), { values: values });
        });
        return tickersWithSelectedValues;
    };
    var tickersValuesToDisplay = getTickersValuesToDisplay(tickers);
    //const formattedTickersToDisplay = formatTickers(tickersValuesToDisplay);
    return (React.createElement(React.Fragment, null,
        React.createElement("table", { className: "table" },
            React.createElement("thead", null,
                React.createElement("tr", null,
                    React.createElement("th", { className: "table__item-name", scope: "col" }, "Name"),
                    React.createElement("th", { scope: "col" }, "Last"),
                    React.createElement("th", { scope: "col" }, "Change"),
                    React.createElement("th", { scope: "col" }, "Change Percent"),
                    React.createElement("th", { scope: "col" }, "High"),
                    React.createElement("th", { scope: "col" }, "Low"))),
            React.createElement("tbody", { className: "table__body" }, tickersValuesToDisplay.map(function (ticker) {
                var symbol = ticker.pair;
                return (React.createElement("tr", { key: ticker.chanId },
                    React.createElement("td", { onClick: function () { return navigate("/details/".concat(symbol)); }, className: "table__item" }, symbol),
                    ticker.values.map(function (value, i) { return (React.createElement("td", { key: i }, value)); })));
            })))));
};
export default Table;
