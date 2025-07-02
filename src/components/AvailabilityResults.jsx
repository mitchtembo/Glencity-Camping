import React from 'react';
import { useNavigate } from 'react-router-dom';

const AvailabilityResults = ({ results, checkIn, checkOut }) => { // Add checkIn and checkOut props
  const navigate = useNavigate();

  const handleViewProperty = (accommodation) => {
    // Handle both MongoDB _id and regular id fields
    const accommodationId = accommodation._id || accommodation.id;
    navigate(`/chalet/${accommodationId}`, { state: { checkIn, checkOut } });
  };

  if (!results || results.length === 0) {
    return (
      <section className="px-6 md:px-10 lg:px-20 py-12">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">No Accommodations Available</h2>
          <p className="text-gray-600">Unfortunately, there are no accommodations available for the selected dates or party size. Please try different dates or contact us for assistance.</p>
        </div>
      </section>
    );
  }

  return (
    <section className="px-6 md:px-10 lg:px-20 py-12 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold leading-tight tracking-[-0.015em] mb-8 text-center">Available Accommodations</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {results.map(acc => {
            // Handle both MongoDB _id and regular id fields
            const accommodationId = acc._id || acc.id;
            return (
              <div key={accommodationId} className="flex flex-col rounded-xl overflow-hidden shadow-lg bg-white transition-transform hover:scale-105 duration-300">
                <img src={acc.image} alt={acc.name} className="w-full h-48 object-cover" />
                <div className="p-5 flex flex-col flex-grow">
                  <h3 className="text-[#0e171b] text-lg font-semibold leading-normal mb-1">{acc.name}</h3>
                  <p className="text-[#4e8397] text-sm font-normal leading-relaxed">
                    {acc.type} - Up to {acc.capacity} guests
                  </p>
                  <div className="flex-grow" />
                  <p className="text-lg font-semibold text-[#b2d7e5] mt-3">${acc.price} <span className="text-sm font-normal text-gray-500">/ night</span></p>
                  <button
                    onClick={() => handleViewProperty(acc)}
                    className="mt-4 flex items-center justify-center gap-2 w-full h-11 px-6 bg-[#19abe5] text-white text-sm font-bold rounded-lg hover:bg-[#138ac2] transition-colors"
                  >
                    View Property
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
export default AvailabilityResults;
