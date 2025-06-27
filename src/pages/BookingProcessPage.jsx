import React, { useState, useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import accommodations from '../data/accommodations.json';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const BookingProcessPage = () => {
  const { accommodationId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [accommodation, setAccommodation] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  // Extract check-in and check-out dates from location state
  const { checkInDate, checkOutDate } = location.state || {};

  useEffect(() => {
    const foundAccommodation = accommodations.find(acc => acc.id.toString() === accommodationId);
    if (foundAccommodation) {
      setAccommodation(foundAccommodation);
    } else {
      setError('Accommodation not found.');
    }
  }, [accommodationId]);

  const handleBookingConfirmation = () => {
    if (!name || !email) {
      alert('Please fill in your name and email.');
      return;
    }
    if (!checkInDate || !checkOutDate) {
      alert('Check-in and Check-out dates are missing. Please restart the booking process.');
      return;
    }
    // In a real app, here you would:
    // 1. Validate availability again
    // 2. Process payment
    // 3. Save booking to database
    // 4. Generate actual QR code
    // 5. Send confirmation email

    // Simulate adding booking to the accommodation in memory
    const updatedAccommodation = {
      ...accommodation,
      bookings: [
        ...(accommodation.bookings || []),
        {
          from: checkInDate,
          to: checkOutDate,
          user: email,
        }
      ]
    };

    console.log('Simulated Booking:', {
      accommodationId: updatedAccommodation.id,
      accommodationName: updatedAccommodation.name,
      userName: name,
      userEmail: email,
      checkIn: checkInDate,
      checkOut: checkOutDate,
      pricePerNight: updatedAccommodation.price,
    });
    console.log('Updated accommodation object (in memory for this session):', updatedAccommodation);

    const accommodationIndex = accommodations.findIndex(acc => acc.id === accommodation.id);
    if (accommodationIndex !== -1) {
      accommodations[accommodationIndex] = updatedAccommodation;
    }

    setAccommodation(updatedAccommodation);
    setBookingConfirmed(true);
  };

  if (error) {
    return (
      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto bg-white shadow-xl rounded-xl p-6 md:p-8 text-center">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
          <p className="text-gray-700">{error}</p>
          <Button onClick={() => navigate('/')} className="mt-6">Go to Homepage</Button>
        </div>
      </main>
    );
  }

  if (!accommodation) {
    return (
      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md mx-auto text-center">
          <p className="text-gray-700 text-xl">Loading accommodation details...</p>
        </div>
      </main>
    );
  }

  if (bookingConfirmed) {
    return (
      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-lg mx-auto bg-white shadow-xl rounded-xl p-6 md:p-8 text-center">
          <h2 className="text-3xl font-bold text-green-600 mb-4">Booking Confirmed!</h2>
          <p className="text-gray-700 mb-2">Thank you for booking <strong>{accommodation.name}</strong>.</p>
          <p className="text-gray-700 mb-2">A confirmation email has been sent to <strong>{email}</strong>.</p>
          <p className="text-gray-700">Check-in: <strong>{checkInDate}</strong> | Check-out: <strong>{checkOutDate}</strong></p>
          <div className="mt-6 p-4 border border-dashed border-gray-300 rounded-md">
            <p className="text-lg font-semibold">QR Code Placeholder</p>
            <div className="w-32 h-32 bg-gray-200 mx-auto mt-2 flex items-center justify-center">
              <p className="text-sm text-gray-500">[QR Code]</p>
            </div>
          </div>
           <p className="mt-4 text-sm text-gray-500">Payment processed successfully (Simulated).</p>
          <Button onClick={() => navigate('/')} className="mt-8">Back to Homepage</Button>
        </div>
      </main>
    );
  }

  return (
    <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg mx-auto bg-white shadow-xl rounded-xl p-6 md:p-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Book Your Stay</h2>

        <div className="mb-6 border-b pb-4">
          <h3 className="text-xl font-semibold text-gray-800">{accommodation.name}</h3>
          <p className="text-gray-600">{accommodation.type} - Up to {accommodation.capacity} guests</p>
          <p className="text-2xl font-bold text-[#19abe5] mt-2">${accommodation.price} <span className="text-sm font-normal text-gray-500">/ night</span></p>
        </div>

        <div className="mb-6">
            {checkInDate && checkOutDate ? (
                <>
                    <p className="text-md text-gray-700"><span className="font-semibold">Check-in:</span> {checkInDate}</p>
                    <p className="text-md text-gray-700"><span className="font-semibold">Check-out:</span> {checkOutDate}</p>
                </>
            ) : (
                <p className="text-md text-red-500">Warning: Check-in and Check-out dates not specified. Please go back and select dates.</p>
            )}
        </div>

        <div className="space-y-4">
          <div>
            <Label htmlFor="name" className="text-gray-700">Full Name</Label>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your Name"
              className="mt-1"
            />
          </div>
          <div>
            <Label htmlFor="email" className="text-gray-700">Email Address</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com"
              className="mt-1"
            />
          </div>
        </div>

        <div className="mt-8 border-t pt-6">
          <h4 className="text-lg font-semibold text-gray-700 mb-3">Payment Information</h4>
          <div className="p-4 bg-gray-50 rounded-md">
            <p className="text-sm text-gray-600">Payment gateway integration placeholder. For now, clicking "Confirm Booking" will simulate a successful payment.</p>
          </div>
        </div>

        <Button
          onClick={handleBookingConfirmation}
          className="w-full mt-8 h-12 text-lg"
          disabled={!checkInDate || !checkOutDate}
        >
          Confirm Booking & Pay (Simulated)
        </Button>
      </div>
    </main>
  );
};

export default BookingProcessPage;
