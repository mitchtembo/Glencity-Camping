import React from 'react';

const Bookings = () => {
  return (
    <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">My Bookings</h2>
          <p className="mt-4 text-lg leading-6 text-gray-600">
            Here are your current and past bookings.
          </p>
        </div>
        <div className="bg-white shadow-xl rounded-xl p-6 md:p-8 mb-12">
          <div className="grid grid-cols-1 gap-8">
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Cozy Corner Dorm</h3>
              <p className="text-gray-600 mb-4">Check-in: 2024-07-01 | Check-out: 2024-07-05</p>
              <p className="text-lg font-semibold text-[#b2d7e5]">$100 <span className="text-sm font-normal text-gray-500">total</span></p>
            </div>
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-2">Serene Chalet</h3>
              <p className="text-gray-600 mb-4">Check-in: 2024-08-15 | Check-out: 2024-08-20</p>
              <p className="text-lg font-semibold text-[#b2d7e5]">$500 <span className="text-sm font-normal text-gray-500">total</span></p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Bookings;
