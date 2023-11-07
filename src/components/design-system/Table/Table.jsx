import "./Table.css";
import { useNavigate } from "react-router-dom";
import { formatTickers } from "../../../common/tickerFormatter";

const Table = ({ selectedTickers }) => {
  const navigate = useNavigate();


  // const getTickersValueToDisplay = (tickers) => {
  //   console.log(tickers)
  //   //const tickerIndexesToDisplay = [0, 7, 5, 6, 9, 10];
  //   const tickerIndexesToDisplay = [0, 1, 8, 6, 7, 10, 11]; // 0 - это chanId
  //   return tickers?.map((ticker) =>
  //     tickerIndexesToDisplay.map((index) => ticker[index])
  //   );
  // };

  // const getTickersToDisplay = (tickers) => {
  //   console.log(tickers)
  //   //const tickerIndexesToDisplay = [0, 7, 5, 6, 9, 10];
  //   const tickerIndexesToDisplay = [0, 1, 8, 6, 7, 10, 11]; // 0 - это chanId
  //   tickers?.map((ticker) =>
  //     tickerIndexesToDisplay.map((index) => ticker[index])
  //   );
  //   setTickersToDisplay(tickers)
  // };

  // useEffect(() => {
  //   getTickersToDisplay(selectedTickers);

  // }, [selectedTickers, tickersToDisplay])

  const formattedTickersToDisplay = formatTickers(selectedTickers);
  //console.log(formattedTickersToDisplay)

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
          {formattedTickersToDisplay.map((ticker) => {
            const cryptoPairName = ticker[0].slice(1);
            return (
              <tr key={ticker[0]}>
                <td
                  onClick={() => navigate(`/details/${cryptoPairName}`)}
                  className="table__item"
                >
                  {cryptoPairName}
                </td>
                {ticker.slice(1).map((value, i) => (
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
