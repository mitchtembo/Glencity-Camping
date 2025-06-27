import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Calendar, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import accommodations from '../data/accommodations.json';

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

const BookingWidget = () => {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(1);
  const navigate = useNavigate();

  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split('T')[0];

  const handleSearch = () => {
    const results = accommodations.map(acc => ({
      ...acc,
      isBooked: isBooked(acc, checkIn, checkOut)
    }));
    navigate('/accommodation', { state: { results, checkIn, checkOut, guests } });
  };

  return (
    // This flex container directly holds all your form elements.
    // - flex-col for small screens (stacks vertically)
    // - md:flex-row for medium screens and up (lays out horizontally)
    // - gap-4 for consistent spacing between items
    // - items-end aligns the bottom of all elements for a clean line
    // - justify-center centers the group horizontally within its parent
    <div className="flex flex-col md:flex-row gap-4 items-end justify-center w-full">
      {/* Check-in Input */}
      <div className="flex-1 min-w-[200px]">
        <label htmlFor="check-in" className="block text-sm font-medium text-gray-700 mb-1">Check-in</label>
        <div className="relative">
          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            id="check-in"
            type="date"
            value={checkIn}
            onChange={(e) => setCheckIn(e.target.value)}
            className="pl-10 w-full h-12 rounded-md border-gray-300"
            min={today}
          />
        </div>
      </div>

      {/* Check-out Input */}
      <div className="flex-1 min-w-[200px]">
        <label htmlFor="check-out" className="block text-sm font-medium text-gray-700 mb-1">Check-out</label>
        <div className="relative">
          <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            id="check-out"
            type="date"
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            className="pl-10 w-full h-12 rounded-md border-gray-300"
            min={today}
          />
        </div>
      </div>

      {/* Number of Guests Input - Shorter Width */}
      <div className="flex-none w-[100px]">
        <label htmlFor="guests" className="block text-sm font-medium text-gray-700 mb-1">Guests</label>
        <div className="relative">
          <Users className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            id="guests"
            type="number"
            min="1"
            value={guests}
            onChange={(e) => setGuests(Number(e.target.value))}
            className="pl-10 w-full h-12 rounded-md border-gray-300"
          />
        </div>
      </div>

      {/* Search Button */}
      <Button
        onClick={handleSearch}
        className={`h-12 px-8 bg-[#19abe5] hover:bg-[#138ac2] text-white ${(!checkIn || !checkOut || !guests) ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={!checkIn || !checkOut || !guests}
      >
        <Search className="w-4 h-4 mr-2" />
        Search
      </Button>
    </div>
  );
};

export default BookingWidget;