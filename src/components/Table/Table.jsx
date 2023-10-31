import './Table.css';
import { useNavigate } from 'react-router-dom';

const Table = ({symbols, symbolsData}) => {
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
            {/* {currencyData?.map((item) => {
              return(
                <tr key={item.id}>
                  <td onClick={() => goToDetailsPage(item)} className='table__item'>
                    {item.name}
                  </td>
                  <td>{item.last}</td>
                  <td>{item.change}</td>
                  <td>{item.changePercent}</td>
                  <td>{item.high}</td>
                  <td>{item.low}</td>
                </tr>
              )
            })} */}
            {symbols?.map((item) => {
              return(
                <tr key={item}>
                  <td onClick={() => goToDetailsPage(item)} className='table__item'>
                    {item}
                  </td>
                  {symbolsData?.map((item) => {
                    return(
                      <>
                      <td>{item[6]}</td>
                      <td>{item[4]}</td>
                      <td>{item[5]}</td>
                      <td>{item[8]}</td>
                      <td>{item[9]}</td>
                      </>
                    )
                  })}
                  {/* <td>{item}</td>
                  <td>{item}</td>
                  <td>{item}</td>
                  <td>{item}</td>
                  <td>{item}</td> */}
                </tr>
              )
            })}
          </tbody>

      </table>
    </>
  )
}

export default Table
