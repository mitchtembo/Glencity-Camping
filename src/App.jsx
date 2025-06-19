import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';

function App() {
  return (
    <Router>
      <div className="relative flex size-full min-h-screen flex-col group/design-root overflow-x-hidden" style={{fontFamily: '"Plus Jakarta Sans", "Noto Sans", sans-serif'}}>
        <div className="layout-container flex h-full grow flex-col">
          <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            {/* Add other routes here as they are created */}
          </Routes>
          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;
