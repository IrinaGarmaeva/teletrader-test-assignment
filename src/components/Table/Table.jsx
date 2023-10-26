import './Table.css';
import { currencyData } from '../../utils/conts';

const Table = () => {
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
          <tbody className="table__body">
            {currencyData?.map((item) => {
              return(
                <tr key={item.id}>
                  {/* <th scope="row" ></th> */}
                  <td>
                    {item.name}
                  </td>
                  <td>{item.last}</td>
                  <td>{item.change}</td>
                  <td>{item.high}</td>
                  <td>{item.low}</td>
                </tr>
              )
            })}
          </tbody>
        </thead>
      </table>
    </>
  )
}

export default Table
