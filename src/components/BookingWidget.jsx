import React, { useState } from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search } from 'lucide-react'; // Assuming Search is an icon

const BookingWidget = () => {
  const [searchData, setSearchData] = useState({
    checkIn: '',
    checkOut: '',
    guests: '',
  });

  const handleSearch = () => {
    // Placeholder for search functionality
    console.log('Search data:', searchData);
    // TODO: Implement actual search logic or navigation
  };

  return (
    <div className="bg-white rounded-2xl shadow-2xl p-8 text-gray-800 max-w-4xl mx-auto">
      <h2 className="text-2xl font-semibold mb-6 text-forest"> {/* text-forest might be custom */}
        Book Your Stay
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div>
          <Label
            htmlFor="checkin"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Check-in
          </Label>
          <Input
            id="checkin"
            type="date"
            value={searchData.checkIn}
            onChange={(e) =>
              setSearchData({ ...searchData, checkIn: e.target.value })
            }
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-forest focus:border-transparent" // custom styling
            min={new Date().toISOString().split("T")[0]}
          />
        </div>
        <div>
          <Label
            htmlFor="checkout"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Check-out
          </Label>
          <Input
            id="checkout"
            type="date"
            value={searchData.checkOut}
            onChange={(e) =>
              setSearchData({ ...searchData, checkOut: e.target.value })
            }
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-forest focus:border-transparent" // custom styling
            min={
              searchData.checkIn ||
              new Date().toISOString().split("T")[0]
            }
          />
        </div>
        <div>
          <Label
            htmlFor="guests"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Guests
          </Label>
          <Select
            value={searchData.guests}
            onValueChange={(value) =>
              setSearchData({ ...searchData, guests: value })
            }
          >
            <SelectTrigger className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-forest focus:border-transparent"> {/* custom styling */}
              <SelectValue placeholder="Select guests" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">1 Guest</SelectItem>
              <SelectItem value="2">2 Guests</SelectItem>
              <SelectItem value="3">3 Guests</SelectItem>
              <SelectItem value="4">4 Guests</SelectItem>
              <SelectItem value="5">5 Guests</SelectItem>
              <SelectItem value="6">6+ Guests</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-end">
          <Button
            onClick={handleSearch}
            className="w-full bg-sunset text-white py-3 px-6 rounded-lg hover:bg-orange-600 transition-colors font-semibold" // custom styling, bg-sunset might be custom
            disabled={!searchData.checkIn || !searchData.checkOut}
          >
            <Search className="w-4 h-4 mr-2" />
            Search
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BookingWidget;
