import Navbar from '../Navbar/Navbar';
import './Header.css';

const Header = ({handleLogin, isLoggedIn}) => {
  return (
    <header className='header'>
      <a href="https://www.teletrader.rs/" target="_blank" rel="noopener noreferrer" className='header__logo'>TeleTrader</a>
      <Navbar handleLogin={handleLogin} isLoggedIn={isLoggedIn}/>
    </header>
  )
}

export default Header
