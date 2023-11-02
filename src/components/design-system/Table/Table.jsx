import './Table.css';
import { useNavigate } from 'react-router-dom';

const Table = ({ firstFiveCryptoPairNames, tickers }) => {
  const navigate = useNavigate();

  function goToDetailsPage(item) {
    navigate(`/details/${item.name}`);
  }

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
              return(
                <tr key={cryptoPairName}>
                  <td onClick={() => goToDetailsPage(cryptoPairName)} className='table__item'>
                    {cryptoPairName}
                  </td>
                  {tickers?.map((cryptoPair) => {
                    return(
                      <>
                      <td>{cryptoPair[6]}</td>
                      <td>{cryptoPair[4]}</td>
                      <td>{cryptoPair[5]}</td>
                      <td>{cryptoPair[8]}</td>
                      <td>{cryptoPair[9]}</td>
                      </>
                    )
                  })}
                </tr>
              )
            })}
          </tbody>
      </table>
    </>
  )
}

export default Table
