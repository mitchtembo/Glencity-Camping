import React from 'react';

const BookingWidget = () => {
  return (
    <div className="mt-8 flex flex-col sm:flex-row items-center gap-3 p-4 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg w-full max-w-xl">
      <div className="relative flex-grow w-full sm:w-auto">
        <label htmlFor="checkin-date" className="block text-sm font-medium text-gray-700">Check-in Date</label>
        <input
          type="date"
          id="checkin-date"
          className="form-input w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#0e171b] focus:outline-none focus:ring-2 focus:ring-[#19abe5] border border-[#d0e0e7] bg-white h-12 placeholder:text-[#6b7f87] px-4 text-sm font-normal leading-normal md:text-base"
        />
      </div>
      <div className="relative flex-grow w-full sm:w-auto">
        <label htmlFor="checkout-date" className="block text-sm font-medium text-gray-700">Check-out Date</label>
        <input
          type="date"
          id="checkout-date"
          className="form-input w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#0e171b] focus:outline-none focus:ring-2 focus:ring-[#19abe5] border border-[#d0e0e7] bg-white h-12 placeholder:text-[#6b7f87] px-4 text-sm font-normal leading-normal md:text-base"
        />
      </div>
      <div className="relative flex-grow w-full sm:w-auto">
        <label htmlFor="guests" className="block text-sm font-medium text-gray-700">Guests</label>
        <input
          type="number"
          id="guests"
          min="1"
          className="form-input w-full min-w-0 flex-1 resize-none overflow-hidden rounded-lg text-[#0e171b] focus:outline-none focus:ring-2 focus:ring-[#19abe5] border border-[#d0e0e7] bg-white h-12 placeholder:text-[#6b7f87] px-4 text-sm font-normal leading-normal md:text-base"
          placeholder="Number of guests"
        />
      </div>
      <button className="flex w-full sm:w-auto min-w-[120px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-12 px-6 bg-[#19abe5] text-white text-sm font-bold leading-normal tracking-[0.015em] hover:bg-[#138ac2] transition-colors mt-4 sm:mt-0 self-end">
        <span className="truncate">Book Now</span>
      </button>
    </div>
  );
};

export default BookingWidget;
