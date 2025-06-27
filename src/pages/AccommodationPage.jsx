import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import accommodationsData from '../data/accommodations.json';

const AccommodationPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Attempt to get results and dates from state; fallback if not present (e.g. direct navigation)
  const results = location.state?.results || accommodationsData;
  const checkInDate = location.state?.checkInDate;
  const checkOutDate = location.state?.checkOutDate;

  const handleBookNow = (accommodation) => {
    if (!checkInDate || !checkOutDate) {
      // This case might happen if the user navigates directly to /accommodation
      // or if the state wasn't passed correctly.
      alert("Please select your check-in and check-out dates from the homepage first.");
      navigate('/'); // Redirect to homepage to select dates
      return;
    }
    navigate(`/book/${accommodation.id}`, {
      state: {
        checkInDate: checkInDate,
        checkOutDate: checkOutDate
      }
    });
  };

  return (
    <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
            {location.state?.results ? 'Available Accommodations' : 'Our Accommodations'}
          </h2>
          <p className="mt-4 text-lg leading-6 text-gray-600">
            {location.state?.results
              ? `Here are the accommodations available from ${checkInDate || ''} to ${checkOutDate || ''}.`
              : 'Explore our diverse range of accommodation options, from cozy dormitories to private chalets and scenic camping spots.'}
          </p>
          {!location.state?.results && (
            <p className="mt-2 text-sm text-gray-500">
              To see availability, please search from the <a href="/" className="text-[#19abe5] hover:underline">homepage</a>.
            </p>
          )}
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
                  onClick={() => handleBookNow(acc)}
                  className="mt-auto flex items-center justify-center gap-2 w-full md:w-auto h-11 px-6 bg-[#b2d7e5] text-white text-sm font-bold rounded-lg hover:bg-[#a1c3d0] transition-colors"
                  // Disable button if dates are not available (e.g., direct navigation to /accommodation)
                  disabled={!checkInDate || !checkOutDate}
                >
                  <span className="material-icons-outlined text-lg">shopping_cart</span>
                  Book Now
                </button>
                {(!checkInDate || !checkOutDate) && location.state?.results && (
                    <p className="text-xs text-red-500 mt-1 text-center md:text-left">Dates not found, search again.</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default AccommodationPage;
