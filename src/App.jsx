import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import DormitoriesPage from './pages/DormitoriesPage';
import ActivitiesPage from './pages/ActivitiesPage';
import DiningPage from './pages/DiningPage';
import EventsPage from './pages/EventsPage';

function App() {
  return (
    <Router>
      <div className="relative flex size-full min-h-screen flex-col group/design-root overflow-x-hidden" style={{fontFamily: '"Plus Jakarta Sans", "Noto Sans", sans-serif'}}>
        <div className="layout-container flex h-full grow flex-col">
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/dormitories" element={<DormitoriesPage />} />
            <Route path="/activities" element={<ActivitiesPage />} />
            <Route path="/dining" element={<DiningPage />} />
            <Route path="/events" element={<EventsPage />} />
          </Routes>
          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;
