import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import AccommodationPage from './pages/AccommodationPage';
import ActivitiesPage from './pages/ActivitiesPage';
import DiningPage from './pages/DiningPage';
import EventsPage from './pages/EventsPage';
import ContactPage from './pages/ContactPage';
import Bookings from './pages/Bookings';
import BookingPage from './pages/BookingPage'; // Import the new BookingPage
import ChaletPage from './pages/ChaletPage';

function App() {
  return (
    <Router>
      <div className="relative flex size-full min-h-screen flex-col group/design-root overflow-x-hidden" style={{fontFamily: '"Plus Jakarta Sans", "Noto Sans", sans-serif'}}>
        <div className="layout-container flex h-full grow flex-col pt-16">
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/accommodation" element={<AccommodationPage />} />
            <Route path="/activities" element={<ActivitiesPage />} />
            <Route path="/dining" element={<DiningPage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/bookings" element={<Bookings />} />
            <Route path="/booking/:id" element={<BookingPage />} /> {/* Add route for BookingPage */}
            <Route path="/chalet/:id" element={<ChaletPage />} />
          </Routes>
          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;
