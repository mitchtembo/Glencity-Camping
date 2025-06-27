import React from 'react';
import { useLocation } from 'react-router-dom';
import accommodationsData from '../data/accommodations.json'; // Renamed for clarity
import AvailabilityResults from '../components/AvailabilityResults'; // Import AvailabilityResults

const AccommodationPage = () => {
  const location = useLocation();
  // results, checkIn, and checkOut will be passed via location.state from BookingWidget
  const { results, checkIn, checkOut } = location.state || {};

  // If there are no results passed (e.g. direct navigation to /accommodation), show all accommodations
  const displayResults = results || accommodationsData.map(acc => ({ ...acc, isBooked: false }));

  return (
    <main className="flex-1"> {/* Removed padding here, as AvailabilityResults has its own */}
      {/* The header/title section can remain here or be moved into AvailabilityResults if preferred */}
      <section className="px-6 md:px-10 lg:px-20 py-12">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl mb-4">
            {results ? 'Available Accommodations' : 'Our Accommodations'}
          </h2>
          <p className="text-lg leading-6 text-gray-600">
            {results
              ? 'Here are the accommodations available for your selected dates.'
              : 'Explore our diverse range of accommodation options, from cozy dormitories to private chalets and scenic camping spots.'}
          </p>
        </div>
      </section>
      <AvailabilityResults results={displayResults} checkIn={checkIn} checkOut={checkOut} />
    </main>
  );
};

export default AccommodationPage;
