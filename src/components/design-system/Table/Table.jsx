import "./Table.css";
import { useNavigate } from "react-router-dom";
import { formatTickers } from "../../../common/tickerFormatter";

const Table = ({tickers}) => {
  const navigate = useNavigate();

  const getTickersValuesToDisplay = (tickers) => {
    const tickersWithSelectedValues = tickers.map((ticker) => {
      const values = ticker.values.filter((_, index) =>
        [0, 7, 5, 6, 9, 10].includes(index)
      );
      return { ...ticker, values };
    });
    return tickersWithSelectedValues;
  };

  const tickersValuesToDisplay = getTickersValuesToDisplay(tickers);

  //const formattedTickersToDisplay = formatTickers(tickersValuesToDisplay);

  return (
    <>
      <table className="table">
        <thead>
          <tr>
            <th  className="table__item-name" scope="col">Name</th>
            <th scope="col">Last</th>
            <th scope="col">Change</th>
            <th scope="col">Change Percent</th>
            <th scope="col">High</th>
            <th scope="col">Low</th>
          </tr>
        </thead>
        <tbody className="table__body">
          {tickersValuesToDisplay.map((ticker) => {
            const symbol = ticker.pair;
            return (
              <tr key={ticker.chanId}>
                <td
                  onClick={() => navigate(`/details/${symbol}`)}
                  className="table__item"
                >
                  {symbol}
                </td>
                {ticker.values.map((value, i) => (
                  <td key={i}>{value}</td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default Table;
