import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  return (
    <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-slate-200 px-4 md:px-10 py-4 shadow-sm bg-white fixed top-0 left-0 right-0 z-50">
      <div className="flex items-center gap-4 text-slate-900">
        <div className="flex items-center justify-center rounded-lg bg-[#b2d7e5] p-2">
          <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><path d="M4 4H17.3334V17.3334H30.6666V30.6666H44V44H4V4Z" fill="currentColor"></path></svg>
        </div>
        <h2 className="text-slate-900 text-xl font-bold leading-tight tracking-[-0.015em]">Glencity Camping Site</h2>
      </div>
      {/* Hamburger icon for mobile */}
      <button
        className="md:hidden flex items-center justify-center p-2 rounded focus:outline-none"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        <svg className="h-7 w-7 text-[#b2d7e5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          {menuOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>
      {/* Desktop nav */}
      <nav className="hidden md:flex flex-1 justify-end gap-8 items-center">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `text-sm font-medium leading-normal transition-colors ${isActive ? 'text-[#b2d7e5] font-bold' : 'text-slate-700 hover:text-[#b2d7e5]'}`
          }
          end
        >
          Home
        </NavLink>
        <NavLink
          to="/accommodation"
          className={({ isActive }) =>
            `text-sm font-medium leading-normal transition-colors ${isActive ? 'text-[#b2d7e5] font-bold' : 'text-slate-700 hover:text-[#b2d7e5]'}`
          }
        >
          Accommodation
        </NavLink>
        <NavLink
          to="/activities"
          className={({ isActive }) =>
            `text-sm font-medium leading-normal transition-colors ${isActive ? 'text-[#b2d7e5] font-bold' : 'text-slate-700 hover:text-[#b2d7e5]'}`
          }
        >
          Activities
        </NavLink>
        <NavLink
          to="/contact"
          className={({ isActive }) =>
            `text-sm font-medium leading-normal transition-colors ${isActive ? 'text-[#b2d7e5] font-bold' : 'text-slate-700 hover:text-[#b2d7e5]'}`
          }
        >
          Contact
        </NavLink>
        <NavLink
          to="/bookings"
          className={({ isActive }) =>
            `text-sm font-medium leading-normal transition-colors ${isActive ? 'text-[#b2d7e5] font-bold' : 'text-slate-700 hover:text-[#b2d7e5]'}`
          }
        >
          My Bookings
        </NavLink>
        <button
          className="flex min-w-[100px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-6 bg-[#b2d7e5] text-slate-900 text-sm font-bold leading-normal tracking-[0.015em] hover:bg-opacity-80 transition-colors"
          onClick={() => navigate('/accommodation')}
        >
          <span className="truncate">Book Now</span>
        </button>
        <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 border-2 border-[#b2d7e5] shadow-sm" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAOw-mhrNEYradPszRQNrDNwYvY_fCVdbFJ9rskeFHOYdTvujjNYJ__d3Ju2nE5Gvwqv8Vd3QbsNtVLy18dN-HhSrNwaGWvNTl3gUxPjw19uvo13w_Up88JQUIPv6BzHIKg3oh9xIL3bTwjEJl7IRYS-r_HDZhPxCBBgzPLMOKVGJhFikZ9qzT4Lt7LqK9EI59zyFAwM_VdQqOqz6v-FQXIux0YCFyHOKFFMr3c0DZ1BywHme_hf9TPY9Iim_rL_SSWFTdHCW8w1rvE")'}}></div>
      </nav>
      {/* Mobile nav menu */}
      {menuOpen && (
        <nav className="absolute top-full left-0 w-full bg-white shadow-lg flex flex-col items-stretch gap-2 py-4 px-6 md:hidden z-50 animate-slide-down">
          {[
            { to: '/', label: 'Home' },
            { to: '/accommodation', label: 'Accommodation' },
            { to: '/activities', label: 'Activities' },
            { to: '/contact', label: 'Contact' },
            { to: '/bookings', label: 'My Bookings' },
          ].map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `py-2 text-base font-medium transition-colors border-b ${isActive ? 'text-[#b2d7e5] font-bold' : 'text-slate-700 hover:text-[#b2d7e5]'} `
              }
              onClick={() => setMenuOpen(false)}
              end={item.to === '/'}
            >
              {item.label}
            </NavLink>
          ))}
          <button
            className="mt-2 flex w-full cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-6 bg-[#b2d7e5] text-slate-900 text-base font-bold leading-normal tracking-[0.015em] hover:bg-opacity-80 transition-colors"
            onClick={() => { setMenuOpen(false); navigate('/accommodation'); }}
          >
            <span className="truncate">Book Now</span>
          </button>
        </nav>
      )}
    </header>
  );
};

export default Navbar;
