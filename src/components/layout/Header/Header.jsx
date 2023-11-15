import Navbar from '../../design-system/Navbar/Navbar';
import './Header.css';
import { COMPANY_URL } from '../../../common/consts';

const Header = () => {
  return (
    <header className='header'>
      <a href={COMPANY_URL} target="_blank" rel="noopener noreferrer" className='header__logo'>TeleTrader</a>
      <Navbar />
    </header>
  )
}

export default Header
