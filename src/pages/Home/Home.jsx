import './Home.css';
import Table from '../../components/Table/Table';
import { currencyData } from '../../utils/conts';

const Home = () => {
  return (
    <section className="home">
      <Table />
      {/* <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Last</th>
            <th>Change</th>
            <th>Change Percent</th>
            <th>High</th>
            <th>Low</th>
          </tr>
          <tbody className="table__body">
            {currencyData?.map((item) => {
              return(
                <tr key={item.id}>
                  <td className=''>
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
      </table> */}
    </section>
  )
}

export default Home
