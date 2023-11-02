import "./Table.css";
import { useNavigate } from "react-router-dom";

const Table = ({ firstFiveCryptoPairNames, tickers }) => {
  const navigate = useNavigate();

  function goToDetailsPage(item) {
    navigate(`/details/${item.name}`);
  }

  function getTickersToDisplay(tickersArray) {
    const tickersToKeep = [6, 4, 5, 8, 9];
    const tickerNames = [
      "lastPrice",
      "dailyChange",
      "dailyChangePercentage",
      "dailyHigh",
      "dailyLow",
    ];
    const tickersObject = {};

    tickersToKeep.forEach((index, i) => {
      const data = tickersArray[index];
      const name = tickerNames[i];

      tickersObject[name] = data;
    });

    return tickersObject;
  }

  const tickersToDisplay = getTickersToDisplay(tickers);

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
          {firstFiveCryptoPairNames?.map((cryptoPairName) => {
            return (
              <tr key={cryptoPairName}>
                <td
                  onClick={() => goToDetailsPage(cryptoPairName)}
                  className="table__item"
                >
                  {cryptoPairName}
                </td>
                {Object.keys(tickersToDisplay).map((key) => (
                  <td key={key}>{tickersToDisplay[key]}</td>
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
