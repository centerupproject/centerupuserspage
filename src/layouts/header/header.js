import { Link, useLocation } from 'react-router-dom';
import './header.css';

const Header = () => {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;

  return (
    <div className="header-nav-bar">
      <div className='header-logo'>
        <img src='/center up png 1.png' alt='p' />
      </div>
      <div className='header-navbar'>
        <ul className='navbar-list'>
          <li>
            <Link to="/" className={`navbar-list-links ${isActive('/') ? 'active' : ''}`}>Home</Link>
          </li>
          <li>
            <Link to="/about-us" className={`navbar-list-links ${isActive('/about-us') ? 'active' : ''}`}>About Us</Link>
          </li>
          <li>
            <Link to="/our-team" className={`navbar-list-links ${isActive('/our-team') ? 'active' : ''}`}>Our Team</Link>
          </li>
          <li>
            <Link to="/services" className={`navbar-list-links ${isActive('/services') ? 'active' : ''}`}>Services</Link>
          </li>
          <li>
            <Link to="/contact-us" className={`navbar-list-links ${isActive('/contact-us') ? 'active' : ''}`}>Contact Us</Link>
          </li>
        </ul>
      </div>
      <div className='header-lang'>
        <button>En/Arm</button>
      </div>
    </div>
  );
};

export default Header;
