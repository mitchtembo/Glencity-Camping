import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { QRCodeSVG } from 'qrcode.react';
import { AlertTriangle, Check } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { API_ENDPOINTS } from '../config/api';
import axios from 'axios';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { 
  validateBookingDates, 
  getTodayDate, 
  getTomorrowDate,
  calculateNights,
  formatValidationErrors 
} from '../utils/dateValidation';

const BookingPage = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  const [accommodation, setAccommodation] = useState(null);
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guestName, setGuestName] = useState('');
  const [guestEmail, setGuestEmail] = useState('');
  const [isBooked, setIsBooked] = useState(false);
  const [bookingDetails, setBookingDetails] = useState(null);
  const [validationErrors, setValidationErrors] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);

  // Get today's date in YYYY-MM-DD format
  const today = getTodayDate();

  useEffect(() => {
    const fetchAccommodation = async () => {
      try {
        const res = await axios.get(API_ENDPOINTS.ACCOMMODATIONS.DETAIL(id));
        setAccommodation(res.data);
      } catch (err) {
        console.error('Error fetching accommodation from API:', err);
        setAccommodation(null);
      }
    };

    fetchAccommodation();

    if (location.state) {
      setCheckIn(location.state.checkIn || '');
      setCheckOut(location.state.checkOut || '');
    } else {
      // Check for stored booking data from localStorage
      const storedBookingData = localStorage.getItem('pendingBookingData');
      if (storedBookingData) {
        try {
          const bookingData = JSON.parse(storedBookingData);
          if (bookingData.accommodationId === id) {
            setCheckIn(bookingData.checkIn || '');
            setCheckOut(bookingData.checkOut || '');
            // Clear the stored data after using it
            localStorage.removeItem('pendingBookingData');
          }
        } catch (err) {
          console.error('Error parsing stored booking data:', err);
          localStorage.removeItem('pendingBookingData');
        }
      }
    }
  }, [id, location.state]);

  const handleDateChange = (type, value) => {
    if (type === 'checkIn') {
      setCheckIn(value);
      // Auto-adjust checkout if it's before or equal to new check-in
      if (checkOut && value >= checkOut) {
        const nextDay = new Date(value);
        nextDay.setDate(nextDay.getDate() + 1);
        setCheckOut(nextDay.toISOString().split('T')[0]);
      }
    } else {
      setCheckOut(value);
    }
    
    // Clear errors when user makes changes
    if (validationErrors.length > 0) {
      setValidationErrors([]);
    }
  };

  const validateForm = () => {
    const errors = [];
    
    // Validate guest information
    if (!guestName.trim()) {
      errors.push("Guest name is required");
    }
    if (!guestEmail.trim()) {
      errors.push("Email address is required");
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(guestEmail)) {
      errors.push("Please enter a valid email address");
    }
    
    // Validate dates
    const dateValidation = validateBookingDates(checkIn, checkOut);
    if (!dateValidation.isValid) {
      errors.push(...dateValidation.errors);
    }
    
    return {
      isValid: errors.length === 0,
      errors,
      nights: dateValidation.isValid ? dateValidation.nights : 0
    };
  };

  const handlePayment = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Validate form
    const validation = validateForm();
    
    if (!validation.isValid) {
      setValidationErrors(validation.errors);
      setIsProcessing(false);
      return;
    }

    // Clear any previous errors
    setValidationErrors([]);

    const handleBooking = async () => {
      if (!isAuthenticated) {
        // Handle case where user is not logged in
        setValidationErrors(['You must be logged in to make a booking.']);
        setIsProcessing(false);
        return;
      }

      const newBooking = {
        accommodationId: id,
        startDate: checkIn,
        endDate: checkOut,
        guestName,
        guestEmail,
        totalPrice: accommodation.price * validation.nights,
      };

      try {
        // Check if we have authentication before making the request
        if (!isAuthenticated) {
          setValidationErrors(['You must be logged in to make a booking.']);
          setTimeout(() => {
            const bookingData = {
              accommodationId: id,
              checkIn,
              checkOut,
              accommodationName: accommodation.name
            };
            localStorage.setItem('pendingBookingData', JSON.stringify(bookingData));
            navigate(`/login?redirect=/booking/${id}`);
          }, 2000);
          return;
        }
        
        const res = await axios.post(API_ENDPOINTS.BOOKINGS.CREATE, newBooking);

        const details = {
          accommodationName: accommodation.name,
          guestName,
          guestEmail,
          checkIn,
          checkOut,
          nights: validation.nights,
          totalPrice: accommodation.price * validation.nights,
          qrCode: res.data.booking.qrCode, // Get QR code from server response
        };

        setBookingDetails(details);
        setIsBooked(true);
      } catch (err) {
        console.error(err);
        if (err.response?.status === 409) {
          setValidationErrors(['Accommodation already booked for selected dates. Please choose different dates.']);
        } else if (err.response?.status === 400) {
          // Handle validation errors from backend
          const errors = err.response.data.errors || [err.response.data.msg || 'Invalid input data'];
          setValidationErrors(errors);
        } else if (err.response?.status === 401) {
          setValidationErrors(['You must be logged in to make a booking.']);
          // Redirect to login
          setTimeout(() => {
            const bookingData = {
              accommodationId: id,
              checkIn,
              checkOut,
              accommodationName: accommodation.name
            };
            localStorage.setItem('pendingBookingData', JSON.stringify(bookingData));
            navigate(`/login?redirect=/booking/${id}`);
          }, 2000);
        } else {
          setValidationErrors(['Booking failed. Please try again.']);
        }
      } finally {
        setIsProcessing(false);
      }
    };

    handleBooking();
  };

  if (!accommodation) {
    return <div className="text-center py-10">Accommodation not found.</div>;
  }

  if (isBooked && bookingDetails) {
    return (
      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto bg-white shadow-xl rounded-xl p-6 md:p-8">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Check className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Booking Confirmed!</h2>
            <p className="text-gray-600 mt-2">Your reservation has been successfully processed</p>
          </div>
          
          <div className="text-center mb-6">
            {bookingDetails.qrCode ? (
              <img 
                src={bookingDetails.qrCode} 
                alt="Booking QR Code" 
                className="w-32 h-32 mx-auto border border-gray-200 rounded"
              />
            ) : (
              <div className="w-32 h-32 mx-auto bg-gray-100 rounded flex items-center justify-center">
                <span className="text-gray-500 text-sm">QR Code</span>
              </div>
            )}
          </div>
          
          <div className="space-y-3 bg-gray-50 rounded-lg p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Accommodation</p>
                <p className="font-semibold">{bookingDetails.accommodationName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Guest Name</p>
                <p className="font-semibold">{bookingDetails.guestName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Check-in</p>
                <p className="font-semibold">{bookingDetails.checkIn}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Check-out</p>
                <p className="font-semibold">{bookingDetails.checkOut}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Duration</p>
                <p className="font-semibold">{bookingDetails.nights} night{bookingDetails.nights !== 1 ? 's' : ''}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Price</p>
                <p className="font-semibold text-[#19abe5]">${bookingDetails.totalPrice.toFixed(2)}</p>
              </div>
            </div>
            <div className="border-t pt-4 mt-4">
              <p className="text-sm text-gray-600">Confirmation sent to: <span className="font-medium">{bookingDetails.guestEmail}</span></p>
            </div>
          </div>
          
          <Button onClick={() => navigate('/')} className="w-full mt-8 h-11 bg-[#19abe5] hover:bg-[#138ac2] text-white">
            Back to Home
          </Button>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white shadow-xl rounded-xl p-6 md:p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">Book Your Stay</h2>
            <p className="mt-2 text-lg text-gray-600">You are booking: <strong>{accommodation.name}</strong></p>
          </div>

          <form onSubmit={handlePayment} className="space-y-6">
            {/* Display validation errors */}
            {validationErrors.length > 0 && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-md">
                <div className="flex items-start">
                  <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5 mr-3 flex-shrink-0" />
                  <div className="text-sm text-red-700">
                    <div className="font-medium mb-2">Please fix the following issues:</div>
                    <ul className="list-disc list-inside space-y-1">
                      {validationErrors.map((error, index) => (
                        <li key={index}>{error}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}

            <div>
              <img src={accommodation.image} alt={accommodation.name} className="w-full h-64 object-cover rounded-lg mb-4" />
              <div className="flex justify-between items-center">
                <p className="text-lg font-semibold text-[#b2d7e5]">${accommodation.price} <span className="text-sm font-normal text-gray-500">/ night</span></p>
                {checkIn && checkOut && validationErrors.length === 0 && (
                  <p className="text-sm text-gray-600">
                    {calculateNights(checkIn, checkOut)} night{calculateNights(checkIn, checkOut) !== 1 ? 's' : ''} = 
                    <span className="font-semibold text-[#19abe5] ml-1">
                      ${(accommodation.price * calculateNights(checkIn, checkOut)).toFixed(2)}
                    </span>
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="check-in" className="block text-sm font-medium text-gray-700 mb-1">Check-in Date</Label>
                <Input
                  id="check-in"
                  type="date"
                  value={checkIn}
                  onChange={(e) => handleDateChange('checkIn', e.target.value)}
                  min={today}
                  required
                  className={`w-full h-12 rounded-md border-gray-300 ${
                    validationErrors.some(error => error.toLowerCase().includes('check-in')) 
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
                      : ''
                  }`}
                />
              </div>
              <div>
                <Label htmlFor="check-out" className="block text-sm font-medium text-gray-700 mb-1">Check-out Date</Label>
                <Input
                  id="check-out"
                  type="date"
                  value={checkOut}
                  onChange={(e) => handleDateChange('checkOut', e.target.value)}
                  min={checkIn || getTomorrowDate()}
                  required
                  className={`w-full h-12 rounded-md border-gray-300 ${
                    validationErrors.some(error => error.toLowerCase().includes('check-out')) 
                      ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
                      : ''
                  }`}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="guest-name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</Label>
              <Input
                id="guest-name"
                type="text"
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                required
                className={`w-full h-12 rounded-md border-gray-300 ${
                  validationErrors.some(error => error.toLowerCase().includes('name')) 
                    ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
                    : ''
                }`}
                placeholder="Your Name"
              />
            </div>

            <div>
              <Label htmlFor="guest-email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</Label>
              <Input
                id="guest-email"
                type="email"
                value={guestEmail}
                onChange={(e) => setGuestEmail(e.target.value)}
                required
                className={`w-full h-12 rounded-md border-gray-300 ${
                  validationErrors.some(error => error.toLowerCase().includes('email')) 
                    ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
                    : ''
                }`}
                placeholder="your.email@example.com"
              />
            </div>

            <div className="pt-4">
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Payment Details</h3>
              <div className="bg-gray-100 p-4 rounded-lg text-center">
                <p className="text-gray-600">Payment gateway integration is not yet implemented.</p>
                <p className="text-sm text-gray-500">Clicking "Confirm & Pay" will simulate a successful booking.</p>
              </div>
            </div>

            <Button 
              type="submit" 
              disabled={isProcessing}
              className="w-full h-12 px-8 bg-[#19abe5] hover:bg-[#138ac2] disabled:bg-gray-400 disabled:cursor-not-allowed text-white text-lg font-semibold transition-colors"
            >
              {isProcessing ? (
                <div className="flex items-center justify-center">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Processing...
                </div>
              ) : (
                'Confirm & Pay'
              )}
            </Button>
          </form>
        </div>
      </div>
    </main>
  );
};

export default BookingPage;
