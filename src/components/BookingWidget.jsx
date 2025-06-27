import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label"; // Import Label
import { Search, Calendar, Users } from 'lucide-react'; // Import Users icon

const BookingWidget = ({ onSearch }) => {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');
  const [guests, setGuests] = useState(1); // Default to 1 guest

  const handleSearch = () => {
    // Basic validation
    if (!checkIn || !checkOut) {
      alert("Please select check-in and check-out dates.");
      return;
    }
    if (new Date(checkOut) <= new Date(checkIn)) {
      alert("Check-out date must be after check-in date.");
      return;
    }
    if (guests < 1) {
      alert("Number of guests must be at least 1.");
      return;
    }
    onSearch({ checkIn, checkOut, guests: parseInt(guests, 10) });
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg p-4 max-w-3xl mx-auto"> {/* Increased max-w */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end"> {/* Changed to 4 cols */}
        <div>
          <Label htmlFor="check-in" className="block text-sm font-medium text-gray-700 mb-1">Check-in</Label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
            <Input
              id="check-in"
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              className="pl-10 w-full h-12 rounded-md border-gray-300"
              min={new Date().toISOString().split("T")[0]} // Prevent selecting past dates
            />
          </div>
        </div>
        <div>
          <Label htmlFor="check-out" className="block text-sm font-medium text-gray-700 mb-1">Check-out</Label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
            <Input
              id="check-out"
              type="date"
              value={checkOut}
              onChange={(e) => setCheckOut(e.target.value)}
              className="pl-10 w-full h-12 rounded-md border-gray-300"
              min={checkIn || new Date().toISOString().split("T")[0]} // Prevent selecting dates before check-in
            />
          </div>
        </div>
        <div>
          <Label htmlFor="guests" className="block text-sm font-medium text-gray-700 mb-1">Guests</Label>
          <div className="relative">
            <Users className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
            <Input
              id="guests"
              type="number"
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              min="1"
              className="pl-10 w-full h-12 rounded-md border-gray-300"
            />
          </div>
        </div>
        <Button onClick={handleSearch} className="h-12 px-8 bg-[#19abe5] hover:bg-[#138ac2] text-white md:col-span-1"> {/* Adjusted button span */}
          <Search className="w-4 h-4 mr-2" />
          Search
        </Button>
      </div>
    </div>
  );
};

export default BookingWidget;
