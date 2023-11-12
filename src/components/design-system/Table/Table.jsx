import "./Table.css";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectTickers } from "../../../store/tickers/tickersSlice";
import { formatTickers } from "../../../common/tickerFormatter";

const Table = () => {
  const navigate = useNavigate();
  const tickers = useSelector(selectTickers);

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
            <th scope="col">Name</th>
            <th scope="col">Last</th>
            <th scope="col">Change</th>
            <th scope="col">Change Percent</th>
            <th scope="col">High</th>
            <th scope="col">Low</th>
          </tr>
        </thead>
        <tbody className="table__body">
          {tickersValuesToDisplay.map((ticker) => {
            const cryptoPairName = ticker.pair;
            return (
              <tr key={ticker.chanId}>
                <td
                  onClick={() => navigate(`/details/${cryptoPairName}`)}
                  className="table__item"
                >
                  {cryptoPairName}
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
