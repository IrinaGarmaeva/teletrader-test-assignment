export function formatTickerElement(tickerElement) {
  if (typeof tickerElement === 'number') {
    if (Number.isInteger(tickerElement)) {
      const numberToString = tickerElement.toLocaleString('en-US', { maximumFractionDigits: 0 });
      return numberToString.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1 ');
    } else {
      const decimalPlaces = tickerElement.toString().split('.')[1];
      const maximumFractionDigits = decimalPlaces ? Math.min(decimalPlaces.length, 5) : 0;
      return tickerElement.toLocaleString('en-US', { minimumFractionDigits: maximumFractionDigits, maximumFractionDigits: maximumFractionDigits });
    }
  }
  return tickerElement;
}

export function formatTickers(tickers) {
  return tickers?.map((ticker) => ticker.map((item) => formatTickerElement(item)));
}
