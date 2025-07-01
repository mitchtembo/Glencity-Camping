import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Calendar, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import accommodations from '../data/accommodations.json';
import { 
  validateBookingDates, 
  getTodayDate, 
  getTomorrowDate,
  formatValidationErrors 
} from '../utils/dateValidation';

function isBooked(acc, checkIn, checkOut) {
  if (!checkIn || !checkOut) return false;
  const checkInDate = new Date(checkIn);
  const checkOutDate = new Date(checkOut);
  return acc.bookings.some(b => {
    const bookedFrom = new Date(b.from);
    const bookedTo = new Date(b.to);
    return (
      (checkInDate <= bookedTo && checkOutDate >= bookedFrom)
    );
  });
}

const BookingWidget = ({ accommodation }) => {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [validationErrors, setValidationErrors] = useState([]);
  const navigate = useNavigate();

  const handleDateChange = (type, value) => {
    if (type === 'checkIn') {
      setCheckIn(value);
      // Auto-set checkout to next day if not set
      if (!checkOut && value) {
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

  const handleSearch = () => {
    // If no dates are entered, navigate to the accommodations page without filtering
    if (!checkIn && !checkOut) {
      navigate('/accommodation');
      return;
    }

    // Validate dates if they are entered
    const validation = validateBookingDates(checkIn, checkOut);
    
    if (!validation.isValid) {
      setValidationErrors(validation.errors);
      return;
    }
    
    // Clear any previous errors
    setValidationErrors([]);
    
    // If a specific accommodation is being viewed, navigate to its booking page
    if (accommodation) {
      // Store booking data before navigation
      const bookingData = {
        accommodationId: accommodation.id,
        checkIn,
        checkOut,
        accommodationName: accommodation.name
      };
      localStorage.setItem('tempBookingData', JSON.stringify(bookingData));
      navigate(`/booking/${accommodation.id}`, { state: { checkIn, checkOut } });
    } else {
      // Otherwise, filter all accommodations by availability
      const results = accommodations.map(acc => ({
        ...acc,
        isBooked: isBooked(acc, checkIn, checkOut)
      }));
      navigate('/accommodation', { state: { results, checkIn, checkOut } });
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg p-4 max-w-2xl mx-auto">
      {/* Display validation errors */}
      {validationErrors.length > 0 && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
          <div className="flex items-start">
            <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5 mr-2 flex-shrink-0" />
            <div className="text-sm text-red-700">
              <div className="font-medium mb-1">Please fix the following issues:</div>
              <ul className="list-disc list-inside space-y-1">
                {validationErrors.map((error, index) => (
                  <li key={index}>{error}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
        <div>
          <label htmlFor="check-in" className="block text-sm font-medium text-gray-700 mb-1">Check-in</label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              id="check-in"
              type="date"
              value={checkIn}
              onChange={(e) => handleDateChange('checkIn', e.target.value)}
              min={getTodayDate()}
              className={`pl-10 w-full h-12 rounded-md border-gray-300 ${
                validationErrors.some(error => error.toLowerCase().includes('check-in')) 
                  ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
                  : ''
              }`}
            />
          </div>
        </div>
        <div>
          <label htmlFor="check-out" className="block text-sm font-medium text-gray-700 mb-1">Check-out</label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              id="check-out"
              type="date"
              value={checkOut}
              onChange={(e) => handleDateChange('checkOut', e.target.value)}
              min={checkIn || getTomorrowDate()}
              className={`pl-10 w-full h-12 rounded-md border-gray-300 ${
                validationErrors.some(error => error.toLowerCase().includes('check-out')) 
                  ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
                  : ''
              }`}
            />
          </div>
        </div>
        <Button 
          onClick={handleSearch} 
          className="h-12 px-8 bg-[#19abe5] hover:bg-[#138ac2] text-white"
        >
          <Search className="w-4 h-4 mr-2" />
          Search
        </Button>
      </div>
    </div>
  );
};

export default BookingWidget;
