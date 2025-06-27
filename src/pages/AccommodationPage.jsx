import React from 'react';
import { useLocation } from 'react-router-dom';
import accommodations from '../data/accommodations.json';

const AccommodationPage = () => {
  const location = useLocation();
  const results = location.state?.results || accommodations;

  return (
    <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
            {location.state ? 'Available Accommodations' : 'Our Accommodations'}
          </h2>
          <p className="mt-4 text-lg leading-6 text-gray-600">
            {location.state
              ? 'Here are the accommodations available for your selected dates.'
              : 'Explore our diverse range of accommodation options, from cozy dormitories to private chalets and scenic camping spots.'}
          </p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {results.map(acc => (
            <div key={acc.id} className="bg-white rounded-xl shadow-lg overflow-hidden flex flex-col md:flex-row group">
              <div className="md:w-2/5 h-64 md:h-auto bg-center bg-no-repeat bg-cover" style={{backgroundImage: `url("${acc.image}")`}}></div>
              <div className="p-6 flex flex-col justify-between flex-1">
                <div>
                  <h4 className="text-xl font-bold text-gray-900 mb-1">{acc.name}</h4>
                  <p className="text-gray-600 text-sm mb-3 leading-relaxed">
                    {acc.type} - Up to {acc.capacity} guests
                  </p>
                  <p className="text-lg font-semibold text-[#b2d7e5] mb-3">${acc.price} <span className="text-sm font-normal text-gray-500">/ night</span></p>
                </div>
                <button
                  className={`mt-auto flex items-center justify-center gap-2 w-full md:w-auto h-11 px-6 text-white text-sm font-bold rounded-lg transition-colors ${acc.isBooked ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#b2d7e5] hover:bg-[#a1c3d0]'}`}
                  disabled={acc.isBooked}
                >
                  <span className="material-icons-outlined text-lg">shopping_cart</span>
                  {acc.isBooked ? 'Booked Now' : 'Book Now'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default AccommodationPage;
