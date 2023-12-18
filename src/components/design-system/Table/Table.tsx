import React from 'react';
import './Table.css';
import { useNavigate } from 'react-router-dom';
import { TickerItem } from '../../../store/tickers/tickersSlice';

type TableProps = {
  tickers: TickerItem[]
};

function Table({ tickers }: TableProps) {
  const navigate = useNavigate();

  const getTickersValuesToDisplay = (tickers: TickerItem[]) => {
    const tickersWithSelectedValues = tickers.map((ticker: TickerItem) => {
      const values = ticker.values.filter((_, index) => [0, 7, 5, 6, 9, 10].includes(index));
      return { ...ticker, values };
    });
    return tickersWithSelectedValues;
  };

  const tickersValuesToDisplay = getTickersValuesToDisplay(tickers);

  // const formattedTickersToDisplay = formatTickers(tickersValuesToDisplay);

  return (
    <table className="table">
      <thead>
        <tr>
          <th className="table__item-name" scope="col">Name</th>
          <th scope="col">Last</th>
          <th scope="col">Change</th>
          <th scope="col">Change Percent</th>
          <th scope="col">High</th>
          <th scope="col">Low</th>
        </tr>
      </thead>
      <tbody className="table__body">
        {tickersValuesToDisplay.map((ticker: TickerItem) => {
          const symbol = ticker.pair;
          return (
            <tr key={ticker.chanId}>
              <td
                onClick={() => navigate(`/details/${symbol}`)}
                className="table__item"
              >
                {symbol}
              </td>
              {ticker.values.map((value) => (
                <td key={ticker.chanId}>{value}</td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default Table;
