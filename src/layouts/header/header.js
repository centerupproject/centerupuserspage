import { Link, useLocation } from 'react-router-dom';
import './header.css';
import { useState } from 'react';

const navLabels = {
  home: { en: 'Home', am: 'Գլխավոր' },
  aboutUs: { en: 'About Us', am: 'Մեր Մասին' },
  ourTeam: { en: 'Our Team', am: 'Մեր Թիմը' },
  services: { en: 'Services', am: 'Ծառայություններ' },
  membership: { en: 'Membership', am: 'Անդամագրություն' },
  junior: { en: 'Center Up Junior', am: 'Center Up Junior' }, // example, adjust if needed
  universities: { en: 'International Universities', am: 'Միջազգային Բուհեր' },
  coursesActivities: { en: 'Courses & Activities', am: 'Դասընթացներ և ժամանց' },
  conferences: { en: 'Conferences', am: 'Կոնֆերանսներ' },
  futureUp: { en: 'Future Up', am: 'Future Up' },
  internationalCamps: { en: 'International Camp', am: 'Միջազգային Ճամբար' },
  eventOrg: { en: 'Event Organization', am: 'Միջոցառումների կազմակերպում' },
  contactUs: { en: 'Contact Us', am: 'Կապ մեզ հետ' },
};

const Header = () => {
  const location = useLocation();
  const [servicesOpen, setServicesOpen] = useState(false);
  const [language, setLanguage] = useState(() => localStorage.getItem('language') || 'en');

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

  const isActive = (path) => {
    if (path === '/services') {
      return servicePaths.includes(location.pathname);
    }
    return location.pathname === path;
  };

  const toggleServices = () => {
    setServicesOpen((prev) => !prev);
  };

  const closeServices = () => {
    setServicesOpen(false);
  };

  const toggleLanguage = () => {
    const newLanguage = language === 'en' ? 'am' : 'en';
    setLanguage(newLanguage);
    localStorage.setItem('language', newLanguage);
    window.location.reload();
  };

  // Helper to get label with fallback to English
  const t = (key) => {
    if (!navLabels[key]) return key; // fallback to key itself if missing
    return navLabels[key][language] || navLabels[key].en;
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
              {t('home')}
            </Link>
          </li>
          <li>
            <Link to="/about-us" className={`navbar-list-links ${isActive('/about-us') ? 'active' : ''}`}>
              {t('aboutUs')}
            </Link>
          </li>
          <li>
            <Link to="/our-team" className={`navbar-list-links ${isActive('/our-team') ? 'active' : ''}`}>
              {t('ourTeam')}
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
              {t('services')}
            </span>
            {servicesOpen && (
              <ul className="dropdown-menu">
                <li>
                  <Link to="/membership" onClick={closeServices}>
                    {t('membership')}
                  </Link>
                </li>
                <li>
                  <Link to="/junior" onClick={closeServices}>
                    {t('junior')}
                  </Link>
                </li>
                <li>
                  <Link to="/universities" onClick={closeServices}>
                    {t('universities')}
                  </Link>
                </li>
                <li>
                  <Link to="/courses-activities" onClick={closeServices}>
                    {t('coursesActivities')}
                  </Link>
                </li>
                <li>
                  <Link to="/conferances" onClick={closeServices}>
                    {t('conferences')}
                  </Link>
                </li>
                <li>
                  <Link to="/futureUp" onClick={closeServices}>
                    {t('futureUp')}
                  </Link>
                </li>
                <li>
                  <Link to="/international-camps" onClick={closeServices}>
                    {t('internationalCamps')}
                  </Link>
                </li>
                <li>
                  <Link to="/eventorg" onClick={closeServices}>
                    {t('eventOrg')}
                  </Link>
                </li>
              </ul>
            )}
          </li>

          <li>
            <Link to="/contact-us" className={`navbar-list-links ${isActive('/contact-us') ? 'active' : ''}`}>
              {t('contactUs')}
            </Link>
          </li>
        </ul>
      </div>

      <div className="header-lang">
        <button onClick={toggleLanguage}>
          {language === 'en' ? 'En/Arm' : 'Arm/En'}
        </button>
      </div>
    </div>
  );
};

export default Header;
