import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#e7f0f3] px-10 py-4 bg-white shadow-sm sticky top-0 z-50">
      <div className="flex items-center gap-3 text-[#0e171b]">
        <div className="size-6 text-[#19abe5]">
          <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 4H17.3334V17.3334H30.6666V30.6666H44V44H4V4Z" fill="currentColor"></path>
          </svg>
        </div>
        <h2 className="text-[#0e171b] text-xl font-bold leading-tight tracking-[-0.015em]">
          <Link to="/">Glencity Camping Site</Link>
        </h2>
      </div>
      <nav className="flex flex-1 justify-end gap-8">
        <div className="flex items-center gap-6">
          <Link to="/chalets" className="text-[#0e171b] text-sm font-medium leading-normal hover:text-[#19abe5] transition-colors">Our Chalets</Link>
          <Link to="/dormitories" className="text-[#0e171b] text-sm font-medium leading-normal hover:text-[#19abe5] transition-colors">Dormitories</Link>
          <Link to="/activities" className="text-[#0e171b] text-sm font-medium leading-normal hover:text-[#19abe5] transition-colors">Activities</Link>
          <Link to="/amenities" className="text-[#0e171b] text-sm font-medium leading-normal hover:text-[#19abe5] transition-colors">Amenities</Link>
          <Link to="/special-offers" className="text-[#0e171b] text-sm font-medium leading-normal hover:text-[#19abe5] transition-colors">Special Offers</Link>
          <Link to="/contact" className="text-[#0e171b] text-sm font-medium leading-normal hover:text-[#19abe5] transition-colors">Contact</Link>
        </div>
        <button className="flex min-w-[90px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-5 bg-[#19abe5] text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-[#138ac2] transition-colors">
          <span className="truncate">Book Now</span>
        </button>
      </nav>
    </header>
  );
};

export default Navbar;
