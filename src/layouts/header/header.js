import { Link, useLocation } from 'react-router-dom';
import './header.css';
import { useState } from 'react';

const Header = () => {
  const location = useLocation();
  const [servicesOpen, setServicesOpen] = useState(false);

  // List of dropdown paths for active state check
  const servicePaths = [
    '/membership',
    '/junior',
    '/universities',
    '/courses-activities',
    '/conferances',
    '/futureUp',
    '/international-camps',
    '/eventorg',
    '/upcoming'
  ];

  // Check if current path matches a given path or any service path
  const isActive = (path) => {
    if (path === '/services') {
      return servicePaths.includes(location.pathname);
    }
    return location.pathname === path;
  };

  // Toggle dropdown on click
  const toggleServices = () => {
    setServicesOpen((prev) => !prev);
  };

  // Close dropdown when clicking a link
  const closeServices = () => {
    setServicesOpen(false);
  };

  return (
    <div className="header-nav-bar">
      <div className="header-logo">
        <img src="/center up png 1.png" alt="Center Up Logo" />
      </div>

      <div className="header-navbar">
        <ul className="navbar-list">
          <li>
            <Link to="/" className={`navbar-list-links ${isActive('/') ? 'active' : ''}`}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/about-us" className={`navbar-list-links ${isActive('/about-us') ? 'active' : ''}`}>
              About Us
            </Link>
          </li>
          <li>
            <Link to="/our-team" className={`navbar-list-links ${isActive('/our-team') ? 'active' : ''}`}>
              Our Team
            </Link>
          </li>

          <li className="services-dropdown">
            <span
              className={`navbar-list-links ${isActive('/services') ? 'active' : ''}`}
              onClick={toggleServices}
              role="button"
              aria-expanded={servicesOpen}
              aria-haspopup="true"
            >
              Services
            </span>
            {servicesOpen && (
              <ul className="dropdown-menu">
                <li>
                  <Link to="/membership" onClick={closeServices}>
                    Membership
                  </Link>
                </li>
                <li>
                  <Link to="/junior" onClick={closeServices}>
                    Center Up Junior
                  </Link>
                </li>
                <li>
                  <Link to="/universities" onClick={closeServices}>
                    International Universities
                  </Link>
                </li>
                <li>
                  <Link to="/courses-activities" onClick={closeServices}>
                    Courses & Activities
                  </Link>
                </li>
                <li>
                  <Link to="/conferances" onClick={closeServices}>
                    Conferances
                  </Link>
                </li>
                <li>
                  <Link to="/futureUp" onClick={closeServices}>
                    Future Up
                  </Link>
                </li>
                <li>
                  <Link to="/international-camps" onClick={closeServices}>
                    International Camp
                  </Link>
                </li>
                <li>
                  <Link to="/eventorg" onClick={closeServices}>
                    Event Organization
                  </Link>
                </li>
              </ul>
            )}
          </li>

          <li>
            <Link to="/contact-us" className={`navbar-list-links ${isActive('/contact-us') ? 'active' : ''}`}>
              Contact Us
            </Link>
          </li>
        </ul>
      </div>

      <div className="header-lang">
        <button>En/Arm</button>
      </div>
    </div>
  );
};

export default Header;