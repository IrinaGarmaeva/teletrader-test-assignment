import './Table.css';
import { currencyData } from '../../utils/conts';
import { useNavigate } from 'react-router-dom';
import { getFirst5Symbols } from '../../utils/api';

const Table = ({symbols}) => {
  const navigate = useNavigate();

  function goToDetailsPage(item) {
    navigate(`/details/${item.name}`);
  }

  // function getSymbols() {
  //   console.log('Request to get 5 symbols')
  //   getFirst5Symbols();
  // }

  // getSymbols()


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
                  <td>{item}</td>
                  <td>{item}</td>
                  <td>{item}</td>
                  <td>{item}</td>
                  <td>{item}</td>
                </tr>
              )
            })}
          </tbody>

      </table>
    </>
  )
}

export default Table
