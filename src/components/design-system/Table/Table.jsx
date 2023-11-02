import "./Table.css";
import { useNavigate } from "react-router-dom";

const Table = ({ firstFiveCryptoPairNames, tickers }) => {
  const navigate = useNavigate();

  function goToDetailsPage(cryptoPairName) {
    navigate(`/details/${cryptoPairName}`);
  }

  const getTickersValueToDisplay = (tickers) => {
    const tickerIndexesToDisplay = [0, 7, 5, 6, 9, 10];
    return tickers.map((ticker) =>
      tickerIndexesToDisplay.map((index) => ticker[index])
    );
  };

  const tickersToDisplay = getTickersValueToDisplay(tickers);

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
          {tickersToDisplay.map((tickerData, index) => {
            const cryptoPairName = tickerData[0].slice(1);
            return (
              <tr key={cryptoPairName}>
                <td
                  onClick={() => goToDetailsPage(cryptoPairName)}
                  className="table__item"
                >
                  {cryptoPairName}
                </td>
                {tickerData.slice(1).map((value, i) => (
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
