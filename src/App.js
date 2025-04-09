import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Membership from './pages/membership/membership.js';
import MembershipForm from './pages/membership/membershipForm.js';
import Junior from './pages/junior/junior.js';
import JuniorForm from './pages/junior/juniorForm.js';
import Universities from './pages/universities/universities.js';
import UniversitiesForm from './pages/universities/universitiesForm.js';
import { GoogleOAuthProvider } from '@react-oauth/google';  // Import GoogleOAuthProvider

// The Navbar component
const Navbar = () => {
  return (
    <nav style={styles.navbar}>
      <ul style={styles.navList}>
        <li><Link to="/membership" style={styles.link}>Անդամագրություն</Link></li>
        <li><Link to="/Junior" style={styles.link}>Center Up Junior</Link></li>
        <li><Link to="/universities" style={styles.link}>Universities</Link></li>
      </ul>
    </nav>
  );
};

const App = () => {
  return (
    // Wrap the entire app inside the GoogleOAuthProvider
    <GoogleOAuthProvider clientId="336925899208-iemfbn286iq9sg0gbr51n8akildpdsuc.apps.googleusercontent.com">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/membership" element={<Membership />} />
          <Route path="/membership/form" element={<MembershipForm />} />

          <Route path="/Junior" element={<Junior />} />
          <Route path="/junior/form" element={<JuniorForm />} />

          <Route path="/universities" element={<Universities />} />
          <Route path="/universities/form" element={<UniversitiesForm />} />
        </Routes>
      </Router>
    </GoogleOAuthProvider>
  );
};

const styles = {
  navbar: {
    backgroundColor: '#333',
    padding: '10px',
  },
  navList: {
    display: 'flex',
    listStyle: 'none',
    gap: '20px',
    margin: 0,
    padding: 0,
  },
  link: {
    color: 'white',
    textDecoration: 'none',
    fontWeight: 'bold',
  }
};

export default App;
