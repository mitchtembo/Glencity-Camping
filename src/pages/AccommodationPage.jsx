import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { API_ENDPOINTS } from '../config/api';
import axios from 'axios';
import AvailabilityResults from '../components/AvailabilityResults'; // Import AvailabilityResults

const AccommodationPage = () => {
  const location = useLocation();
  const { results, checkIn, checkOut } = location.state || {};
  const [accommodations, setAccommodations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAccommodations = async () => {
      setLoading(true);
      try {
        setError(null);
        const res = await axios.get(API_ENDPOINTS.ACCOMMODATIONS.LIST);
        setAccommodations(res.data);
      } catch (err) {
        console.error('Error fetching accommodations from API:', err);
        setError('Failed to load accommodations. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    // If results are not available or are empty, fetch all accommodations
    if (!results || results.length === 0) {
      fetchAccommodations();
    } else {
      // If results are available, use them
      setAccommodations(results);
      setLoading(false);
    }
  }, [results]);

  const displayResults = results || accommodations.map(acc => ({ 
    ...acc, 
    isBooked: false,
    // Ensure we have both id and _id for compatibility
    id: acc.id || acc._id,
    _id: acc._id || acc.id
  }));

  return (
    <main className="flex-1">
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
      {loading ? (
        <div className="text-center py-12">
          <div className="text-xl text-gray-600">Loading accommodations...</div>
        </div>
      ) : (
        <AvailabilityResults results={displayResults} checkIn={checkIn} checkOut={checkOut} />
      )}
    </main>
  );
};

export default AccommodationPage;
