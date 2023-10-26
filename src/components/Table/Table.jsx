import './Table.css';
import { currencyData } from '../../utils/conts';
import { useNavigate } from 'react-router-dom';

const Table = () => {
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
            {currencyData?.map((item) => {
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
            })}
          </tbody>

      </table>
    </>
  )
}

export default Table
