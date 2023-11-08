import "./Table.css";
import { useNavigate } from "react-router-dom";
import { formatTickers } from "../../../common/tickerFormatter";

const Table = ({ tickersToDisplay }) => {
  const navigate = useNavigate();

  const formattedTickersToDisplay = formatTickers(tickersToDisplay);

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
