import { useParams } from 'react-router-dom'
import './Details.css'

const Details = () => {
  const { symbol } = useParams()

  return (
    <section className='details'>
      <table>
        <thead>
          <tr>
            <th scope="col">Symbol</th>
            <th scope="col">Last price</th>
            <th scope="col">High</th>
            <th scope="col">Low</th>
          </tr>
        </thead>
        <tbody>
          <tr>
          <td>{symbol}</td>
          <td></td>
          <td></td>
          <td></td>
          </tr>
        </tbody>
      </table>
    </section>
  )
}

export default Details
