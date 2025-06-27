import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Calendar } from 'lucide-react';

const BookingWidget = ({ onSearch }) => {
  const [checkIn, setCheckIn] = useState('');
  const [checkOut, setCheckOut] = useState('');

  const handleSearch = () => {
    onSearch({ checkIn, checkOut, guests: 1 });
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-lg shadow-lg p-4 max-w-2xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
        <div>
          <label htmlFor="check-in" className="block text-sm font-medium text-gray-700 mb-1">Check-in</label>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              id="check-in"
              type="date"
              value={checkIn}
              onChange={(e) => setCheckIn(e.target.value)}
              className="pl-10 w-full h-12 rounded-md border-gray-300"
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
              onChange={(e) => setCheckOut(e.target.value)}
              className="pl-10 w-full h-12 rounded-md border-gray-300"
            />
          </div>
        </div>
        <Button onClick={handleSearch} className="h-12 px-8 bg-[#19abe5] hover:bg-[#138ac2] text-white">
          <Search className="w-4 h-4 mr-2" />
          Search
        </Button>
      </div>
    </div>
  );
};

export default BookingWidget;
