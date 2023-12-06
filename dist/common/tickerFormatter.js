export function formatTickerElement(tickerElement) {
    if (typeof tickerElement === 'number') {
        if (Number.isInteger(tickerElement)) {
            var numberToString = tickerElement.toLocaleString('en-US', { maximumFractionDigits: 0 });
            return numberToString.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ');
        }
        else {
            var decimalPlaces = tickerElement.toString().split('.')[1];
            var maximumFractionDigits = decimalPlaces ? Math.min(decimalPlaces.length, 5) : 0;
            return tickerElement.toLocaleString('en-US', { minimumFractionDigits: maximumFractionDigits, maximumFractionDigits: maximumFractionDigits });
        }
    }
    return tickerElement;
}
export function formatTickers(tickers) {
    return tickers === null || tickers === void 0 ? void 0 : tickers.map(function (ticker) { return ticker.values.map(function (item) { return formatTickerElement(item); }); });
}
