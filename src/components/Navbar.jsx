import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <header className="flex items-center justify-between whitespace-nowrap border-b border-solid border-slate-200 px-10 py-4 shadow-sm bg-white fixed top-0 left-0 right-0 z-50">
      <div className="flex items-center gap-4 text-slate-900">
        <div className="flex items-center justify-center rounded-lg bg-[#b2d7e5] p-2">
          <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg"><path d="M4 4H17.3334V17.3334H30.6666V30.6666H44V44H4V4Z" fill="currentColor"></path></svg>
        </div>
        <h2 className="text-slate-900 text-xl font-bold leading-tight tracking-[-0.015em]">Glencity Camping Site</h2>
      </div>
      <nav className="flex flex-1 justify-end gap-8 items-center">
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
        <button className="flex min-w-[100px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-10 px-6 bg-[#b2d7e5] text-slate-900 text-sm font-bold leading-normal tracking-[0.015em] hover:bg-opacity-80 transition-colors">
          <span className="truncate">Book Now</span>
        </button>
        <div className="bg-center bg-no-repeat aspect-square bg-cover rounded-full size-10 border-2 border-[#b2d7e5] shadow-sm" style={{backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuAOw-mhrNEYradPszRQNrDNwYvY_fCVdbFJ9rskeFHOYdTvujjNYJ__d3Ju2nE5Gvwqv8Vd3QbsNtVLy18dN-HhSrNwaGWvNTl3gUxPjw19uvo13w_Up88JQUIPv6BzHIKg3oh9xIL3bTwjEJl7IRYS-r_HDZhPxCBBgzPLMOKVGJhFikZ9qzT4Lt7LqK9EI59zyFAwM_VdQqOqz6v-FQXIux0YCFyHOKFFMr3c0DZ1BywHme_hf9TPY9Iim_rL_SSWFTdHCW8w1rvE")'}}></div>
      </nav>
    </header>
  );
};

export default Navbar;
