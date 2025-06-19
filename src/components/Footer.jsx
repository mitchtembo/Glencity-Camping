import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-[#0e171b] text-white py-10">
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-20">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
          <div className="flex items-center gap-3">
            <div className="size-5 text-[#19abe5]">
              <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 4H17.3334V17.3334H30.6666V30.6666H44V44H4V4Z" fill="currentColor"></path>
              </svg>
            </div>
            <h2 className="text-lg font-semibold">Glencity Camping Site</h2>
          </div>
          <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            <Link to="/about" className="text-sm hover:text-[#19abe5] transition-colors">About Us</Link>
            <Link to="/contact" className="text-sm hover:text-[#19abe5] transition-colors">Contact</Link>
            <Link to="/privacy" className="text-sm hover:text-[#19abe5] transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="text-sm hover:text-[#19abe5] transition-colors">Terms of Service</Link>
          </nav>
        </div>
        <hr className="border-t border-[#2a3f48] my-6" />
        <p className="text-sm text-[#9fb3bc] text-center">© 2025 Glencity Camping Site. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
