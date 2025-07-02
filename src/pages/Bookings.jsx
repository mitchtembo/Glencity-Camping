import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { API_ENDPOINTS } from '../config/api';
import axios from 'axios';

const Bookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    const fetchBookings = async () => {
      if (!isAuthenticated) {
        navigate('/login?redirect=/bookings');
        return;
      }

      try {
        const res = await axios.get(API_ENDPOINTS.BOOKINGS.MY_BOOKINGS);
        setBookings(res.data);
      } catch (err) {
        console.error('Error fetching bookings:', err);
        if (err.response?.status === 401) {
          localStorage.removeItem('token');
          navigate('/login?redirect=/bookings');
        } else {
          setError('Failed to load bookings. Please try again.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, [navigate]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const calculateNights = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  if (loading) {
    return (
      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="text-xl text-gray-600">Loading your bookings...</div>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">My Bookings</h2>
          <p className="mt-4 text-lg leading-6 text-gray-600">
            Here are your current and past bookings.
          </p>
        </div>
        
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-md p-4 mb-6">
            <p className="text-sm text-red-700">{error}</p>
          </div>
        )}

        <div className="bg-white shadow-xl rounded-xl p-6 md:p-8 mb-12">
          {bookings.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-600 text-lg">You haven't made any bookings yet.</p>
              <button
                onClick={() => navigate('/accommodation')}
                className="mt-4 px-6 py-3 bg-[#19abe5] text-white rounded-lg hover:bg-[#138ac2] transition-colors"
              >
                Browse Accommodations
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-8">
              {bookings.map((booking) => (
                <div key={booking._id} className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                  <div className="flex flex-col md:flex-row md:justify-between md:items-start">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {booking.accommodation?.name || 'Accommodation'}
                      </h3>
                      <div className="space-y-2">
                        <p className="text-gray-600">
                          <span className="font-medium">Check-in:</span> {formatDate(booking.startDate)}
                        </p>
                        <p className="text-gray-600">
                          <span className="font-medium">Check-out:</span> {formatDate(booking.endDate)}
                        </p>
                        <p className="text-gray-600">
                          <span className="font-medium">Duration:</span> {calculateNights(booking.startDate, booking.endDate)} night(s)
                        </p>
                        <p className="text-gray-600">
                          <span className="font-medium">Guest:</span> {booking.guestName}
                        </p>
                        <p className="text-gray-600">
                          <span className="font-medium">Status:</span> 
                          <span className={`ml-1 px-2 py-1 rounded-full text-xs font-medium ${
                            booking.status === 'confirmed' 
                              ? 'bg-green-100 text-green-800' 
                              : booking.status === 'pending'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                          </span>
                        </p>
                      </div>
                    </div>
                    <div className="mt-4 md:mt-0 md:ml-6 text-right">
                      <p className="text-lg font-semibold text-[#19abe5]">
                        ${booking.totalPrice.toFixed(2)}
                        <span className="text-sm font-normal text-gray-500 block">total</span>
                      </p>
                      <p className="text-xs text-gray-500 mt-2">
                        Booked on {formatDate(booking.createdAt)}
                      </p>
                      {booking.qrCode && (
                        <div className="mt-4 flex flex-col items-center">
                          <p className="text-xs text-gray-500 mb-2">Booking QR Code</p>
                          <img 
                            src={booking.qrCode} 
                            alt="Booking QR Code" 
                            className="w-24 h-24 border border-gray-200 rounded"
                          />
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

export default Bookings;
