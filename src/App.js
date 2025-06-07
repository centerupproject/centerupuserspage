import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation
} from 'react-router-dom';

import Home from './pages/home/home.js';
import Header from './layouts/header/header.js';
import Footer from './layouts/footer/footer.js';
import Membership from './pages/membership/membership.js';
import MembershipForm from './pages/membership/membershipForm.js';
import Junior from './pages/junior/junior.js';
import JuniorForm from './pages/junior/juniorForm.js';
import Universities from './pages/universities/universities.js';
import UniversitiesForm from './pages/universities/universitiesForm.js';
import Workshops from './pages/workshops/workshops.js';
import Conferances from './pages/conferances/conferances.js';
import FutureUp from './pages/futureUp/futureUp.js';
import UpComing from './pages/upcomingEvents/upcomingEvents.js';
import EventOrg from './pages/eventOrg/eventOrg.js';
import InternationalCamps from './pages/intCamps/intCamps.js';

import { GoogleOAuthProvider } from '@react-oauth/google';
import './App.css';

const BackgroundSetter = () => {
  const location = useLocation();



  return null; 
};

const App = () => {
  return (
    <GoogleOAuthProvider clientId="336925899208-iemfbn286iq9sg0gbr51n8akildpdsuc.apps.googleusercontent.com">
      <Router>
        <BackgroundSetter />
        <Header />
        <main style={{ marginTop: '100px' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/membership" element={<Membership />} />
          <Route path="/membership/form" element={<MembershipForm />} />
          <Route path="/Junior" element={<Junior />} />
          <Route path="/junior/form" element={<JuniorForm />} />
          <Route path="/universities" element={<Universities />} />
          <Route path="/universities/form" element={<UniversitiesForm />} />
          <Route path="/courses-activities" element={<Workshops />} />
          <Route path="/conferances" element={<Conferances />} />
          <Route path="/futureUp" element={<FutureUp />} />
          <Route path="/upcoming" element={<UpComing />} />
          <Route path="/eventorg" element={<EventOrg />} />
          <Route path="/international-camps" element={<InternationalCamps />} />
        </Routes>
        </main>
        <Footer />
      </Router>
    </GoogleOAuthProvider>
  );
};

export default App;
